import base64
from datetime import datetime
import os.path
from email import message_from_bytes
import asyncio
from backboard import BackboardClient
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from urllib.request import urlopen
from bs4 import BeautifulSoup
import os
from PIL import Image as pil
from PIL.ExifTags import TAGS
from PIL import ExifTags
import time
from backboard import BackboardClient
import cohere
import pyexiv2

import time



# If modifying scopes, delete token.json
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]

def authenticate():
    creds = None

    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json", SCOPES
            )
            creds = flow.run_local_server(port=0)

        with open("token.json", "w") as token:
            token.write(creds.to_json())

    return creds

def get_full_message_body(payload):
    bodies = []

    def walk_parts(part):
        mime_type = part.get("mimeType", "")
        body = part.get("body", {}).get("data")

        if body and mime_type in ("text/plain", "text/html"):
            decoded = base64.urlsafe_b64decode(body).decode(
                "utf-8", errors="ignore"
            )
            bodies.append(decoded)

        for subpart in part.get("parts", []):
            walk_parts(subpart)

    walk_parts(payload)
    return "\n\n".join(bodies)



def get_month_from_timestamp(timestamp: str) -> str:
    formats = (
        "%a, %d %b %Y %H:%M:%S %z",  # Gmail (+0000)
        "%a, %d %b %Y %H:%M:%S %Z",  # Gmail (GMT)
        "%Y:%m:%d %H:%M:%S",         # EXIF
        "%Y-%m-%d %H:%M:%S"        # EXIF image timestamp
    )

    for fmt in formats:
        try:
            dt = datetime.strptime(timestamp, fmt)
            return dt.strftime("%B")
        except ValueError:
            continue

    raise ValueError(f"Unrecognized date format: {timestamp}")



def get_message_body(payload):
    """
    Recursively extracts email body from Gmail message payload
    """
    if "parts" in payload:
        for part in payload["parts"]:
            body = get_message_body(part)
            if body:
                return body
    else:
        mime_type = payload.get("mimeType", "")
        body_data = payload.get("body", {}).get("data")

        if body_data and mime_type in ["text/plain", "text/html"]:
            decoded_bytes = base64.urlsafe_b64decode(body_data)
            return decoded_bytes.decode("utf-8", errors="ignore")

    return None

def read_inbox(max_results=5):
    emails = []
    creds = authenticate()
    service = build("gmail", "v1", credentials=creds)

    results = service.users().messages().list(
        userId="me",
        labelIds=["INBOX"],
        maxResults=max_results
    ).execute()

    messages = results.get("messages", [])

    if not messages:
        print("No messages found.")
        return

    for msg in messages:
        msg_data = service.users().messages().get(
            userId="me",
            id=msg["id"],
            format="full"
        ).execute()

        headers = msg_data["payload"]["headers"]
        subject = sender = "Unknown"

        for header in headers:
            if header["name"] == "Subject":
                subject = header["value"]
            elif header["name"] == "From":
                sender = header["value"]
            elif header["name"] == "Date":  # Grab the date
                date = header["value"]

        body = get_full_message_body(msg_data["payload"])
        soup = BeautifulSoup(body, features="html.parser")
        
        #print("=" * 80)
        #print(f"From: {sender}")
        #print(f"Subject: {subject}")
        #print("-" * 80)
        #print(body if body else "[No readable body found]")
        # kill all script and style elements
        for script in soup(["script", "style"]):
            script.extract()    # rip it out

        # get text
        text = soup.get_text()

        # break into lines and remove leading and trailing space on each
        lines = (line.strip() for line in text.splitlines())
        # break multi-headlines into a line each
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        # drop blank lines
        text = '\n'.join(chunk for chunk in chunks if chunk)

        #print(text)
        
        emails.append({"sender":sender, "subject":subject, "body":text, "date":date})
        
    return emails
#[{'sender':sender, 'subject': subject, 'body':body, "date":Date}]
def read_images_from_gallery2(path: str):
    files = os.listdir(path)
    images = []
    for image in files:
        temp_image = pil.open(path+'\\'+image)
        date_time="none"
        exifdata = temp_image.getexif()
        for tag, value in exifdata.items():
            if TAGS.get(tag) in ("DateTimeOriginal", "DateTime"):
                    date_time = value
  
        gps_ifd = exifdata.get_ifd(ExifTags.IFD.GPSInfo)

        print(gps_ifd)
        print(date_time)
        
    images.append((path+'\\'+image, gps_ifd, date_time))
        
    return images   


def read_images_from_gallery(path: str):
    images = []

    for filename in os.listdir(path):
        full_path = os.path.join(path, filename)

        if not os.path.isfile(full_path):
            continue

        try:
            with pyexiv2.Image(full_path) as img:
                exif = img.read_exif()
                xmp = img.read_xmp()
        except Exception:
            continue

        # ---- Date / Time ----
        date_time = "none"
        if "Exif.Photo.DateTimeOriginal" in exif:
            date_time = exif["Exif.Photo.DateTimeOriginal"]
        elif "Exif.Image.DateTime" in exif:
            date_time = exif["Exif.Image.DateTime"]

        # ---- Location (XMP) ----
        location = {
            "city": xmp.get("Xmp.photoshop.City"),
            "state": xmp.get("Xmp.photoshop.State"),
            "country": xmp.get("Xmp.photoshop.Country"),
            "country_code": xmp.get("Xmp.iptc.CountryCode"),
            "place": xmp.get("Xmp.iptc.Location"),
        }

        # Remove empty values
        location = {k: v for k, v in location.items() if v is not None}

        print(location)
        print(date_time)

        images.append({"path": full_path, "location":location, "date":date_time})

    print(images)
    #[{path:Path, location:{'city': str, 'country': str}, date:DateTime}]
    return images
#[{path:Path, location:{'city': str, 'country': str}, date:DateTime}]

def image_to_base64(path):
    extension = os.path.splitext(path)[1].lower()
    if extension == '.png':
        mime_type = 'image/png'
    elif extension in ('.jpg', '.jpeg'):
        mime_type = 'image/jpeg'
    elif extension == '.gif':
        mime_type = 'image/gif'
    elif extension == '.svg':
        mime_type = 'image/svg+xml'
    else:
        # Default or handle other types as needed
        mime_type = 'application/octet-stream' 

    # 2. Read the image file in binary mode
    with open(path, 'rb') as image_file:
        binary_data = image_file.read()

    # 3. Encode the binary data to Base64 and decode to a UTF-8 string
    base64_encoded_data = base64.b64encode(binary_data).decode('utf-8')

    # 4. Construct the full data URI string
    data_uri = f'data:{mime_type};base64,{base64_encoded_data}'
    return data_uri 
    
    

def image_captioner(image_array):
    co = cohere.ClientV2("tWzIqXgpeVxBzZO7XXwaTtuev8OK9dIGtq2GA8JG")
    images_with_captions = []
    for count, image in enumerate(image_array):
        time.sleep(1)
        response = co.chat(
            model="command-a-vision-07-2025",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "You are an AI model reviewing key events of your user's life in preparation for a year reflection. Provide a description of the picture, including what the event is, how this relates to the time and place, which you can infer from this context: DATE:"+image["date"]+"location:"+str(image["location"])
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                # Can be either a base64 data URI or a web URL.
                                "url": ""+image_to_base64(image["path"]),
                                "detail": "auto"
                            }
                        }
                    ]
                }
            ]
        )
        images_with_captions.append(image)
        images_with_captions[count]["caption"] = response.message.content[0].text
    
    print(images_with_captions)
    return images_with_captions
#[{path:Path, location:{'city': str, 'country': str}, date:DateTime, caption:Caption}]
 

async def create_monthly_threads(
    client: BackboardClient,
    assistant_id: str,
    monthly_data: dict
) -> dict:
    
    month_to_thread_id = {}

    for month, data in monthly_data.items():
        time.sleep(5)
        thread = await client.create_thread(
            assistant_id=assistant_id,

        )

        thread_id = thread.thread_id
        month_to_thread_id[month] = thread_id
        
        await client.add_message(
            thread_id=thread_id,

            content=f"You are an AI powered system for storing a user's memories for specific month of the year. Your month is {month}. Your memories need to be remembered and referenced for an end of year reflection! Make connections between different memory inputs. ",

        )
        images = data.get("images", [])
        if images:
            image_context = f"These are some descriptions of images from the user's gallery for {month}:"
            for image in images:
                image_context += (
                    f"Location: {image.get('location')}\n"
                    f"Date: {image.get('date')}\n"
                    f"Description: {image.get('description')}\n\n"
                )
        try:
            
            await client.add_message(
                thread_id=thread_id,

                content=image_context,

            )

        except:
            time.sleep(5)
            await client.add_message(
                thread_id=thread_id,

                content=image_context,
            )
        # 3. Insert emails as context
        emails = data.get("emails", [])
        #[{"subject", "date", "sender", "body"}]
        email_context = f"Here are some emails from the user's inbox for {month}:\n"
        for idx, email in enumerate(emails, start=1):
            email_context += (
                f"Subject: {email.get('subject')}\n"
                f"Date: {email.get('date')}\n"
                f"Sender: {email.get('sender')}\n"
                f"Body: {email.get('body')}\n\n"
            )
        time.sleep(3)    
        try:
            await client.add_message(
                thread_id=thread_id,
                
                content=email_context,
                
            )
        except:
            time.sleep(3)    
            await client.add_message(
            thread_id=thread_id,
            
            content=email_context,
            
        )
    return month_to_thread_id
#{Month:thread_id}       
       
#{"January":[{"images":{"location", "date", "description"}, "emails":[{'sender':sender, 'subject': subject, 'body':body, "date":Date}]]}
async def create_month_memory(monthly_data, assistant_id ):
    # Install: pip install backboard-sdk
    # Initialize the Backboard client
    client = BackboardClient(api_key="API KEY")

    threads = await create_monthly_threads(
        client=client,
        assistant_id=assistant_id,
        monthly_data=monthly_data
    )

    print(threads)

    
    return threads

    

async def main():
    #print(await create_month_memory())
    init_image_info = read_images_from_gallery("Gallery")
    final_image_info = image_captioner(init_image_info)
    #[{path:Path, location:{'city': str, 'country': str}, date:DateTime, caption:Caption}]
 
    email_info = read_inbox(5)
    #[{'sender':sender, 'subject': subject, 'body':body, "date":Date}]
    month_data = {
    "January": {"images": [], "emails": []},
    "February": {"images": [], "emails": []},
    "March": {"images": [], "emails": []},
    "April": {"images": [], "emails": []},
    "May": {"images": [], "emails": []},
    "June": {"images": [], "emails": []},
    "July": {"images": [], "emails": []},
    "August": {"images": [], "emails": []},
    "September": {"images": [], "emails": []},
    "October": {"images": [], "emails": []},
    "November": {"images": [], "emails": []},
    "December": {"images": [], "emails": []},
}
    months = month_data.keys()
    for month in months:
        for image in final_image_info:
            print("Image Month = "+ get_month_from_timestamp(image["date"]))
            if get_month_from_timestamp(image["date"]) == month:
                month_data[month]["images"].append(image)
        
        for email in email_info:
            print("Email Month = "+ get_month_from_timestamp(email["date"]))
            if get_month_from_timestamp(email["date"]) == month:
                month_data[month]["emails"].append(email)
#        print(month_data)
    
    client = BackboardClient(api_key="API-KEY")
    assistant = await client.create_assistant("Reflection Assistant", description=("You are an assistant that reasons over monthly data. "
                "Each thread represents a single month and contains images "
                "and email context for that month."
                "This is data about a user's year, pictures are taken from their gallery and feature them in every picture."
                "therefore, refer to the subjects of the pictures as 'you'"
                "emails have information about what the user has done, refer to it as 'you went to x location!' or 'you did x thing!'"
                "Structure in bullet point style"
                "You will be asked to refer back two images from a month, remember the path associated with each!"
                ))
    
    str_length = len(str(month_data))
    memory_addition = await client.add_memory(assistant_id=assistant.assistant_id, content = str(month_data)[0:(str_length//2)])
    memory_id = memory_addition["memory_id"]
    memory_addition = await client.add_memory(assistant_id=assistant.assistant_id, content = str(month_data)[(str_length//2):str_length])
    memory_id = memory_addition["memory_id"]

    
    thread = await client.create_thread(assistant_id=assistant.assistant_id)
    
    print("Assistant ID:", assistant.assistant_id)
    print("Thread ID:", thread.thread_id)
    
    message_respone = await client.add_message(thread_id=thread.thread_id, content="what are two things that happened in December? Answer as exactly two bullet points - dont cite picture paths")
    print(str(message_respone))

asyncio.run(main())