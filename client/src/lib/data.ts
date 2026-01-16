import winter1 from "@assets/stock_images/cozy_winter_snow_sce_72b8397b.jpg";
import winter2 from "@assets/stock_images/cozy_winter_snow_sce_03d12c08.jpg";
import spring1 from "@assets/stock_images/spring_flowers_bloom_c48ad375.jpg";
import spring2 from "@assets/stock_images/spring_flowers_bloom_c3fd424f.jpg";
import summer1 from "@assets/stock_images/summer_beach_sunset__5da586ca.jpg";
import summer2 from "@assets/stock_images/summer_beach_sunset__25440993.jpg";
import autumn1 from "@assets/stock_images/autumn_leaves_forest_cfef5d26.jpg";
import autumn2 from "@assets/stock_images/autumn_leaves_forest_ed4b94e8.jpg";

export interface MonthData {
  id: string;
  name: string;
  season: "winter" | "spring" | "summer" | "autumn";
  images: string[];
  memory: string[];
  resolution: string;
}
const data = { "January": { "sentence": ["You brought autumn\u2019s spirit to life through intricate pumpkin carvings.", "You embraced the lively culture of Dublin with a joyful visit to the Guinness Brewery."], "paths": ["/pics/PXL_20241105_052926338.jpg", "/pics/PXL_20250613_114813418.jpg"], "intentions": "Continue exploring new places and expressing creativity throughout the year." }, "February": { "sentence": ["You gathered with friends in Ottawa, finding joy in simple games of poker.", "You shared laughter and connection over a spirited Monopoly game in Cornwall."], "paths": ["/pics/PXL_20241117_042132583.MP.jpg", "/pics/PXL_20250804_020546809.jpg"], "intentions": "Foster deeper relationships and make time for meaningful social moments." }, "March": { "sentence": ["You savored a peaceful meal at a sunlit caf\u00e9 in Avignon.", "You participated in an immigration event, embracing community in Ottawa."], "paths": ["/pics/PXL_20250604_183838165.jpg", "/pics/PXL_20250815_132757903.jpg"], "intentions": "Seek balance between personal enjoyment and contributing to your community." }, "April": { "sentence": ["You explored the rich history of France through its majestic monuments.", "You embraced quiet moments of reflection by the waterfront in Kingston."], "paths": ["/pics/PXL_20250605_105503394.jpg", "/pics/PXL_20251003_232003715.jpg"], "intentions": "Take time to appreciate history and find peace in quiet reflection." }, "May": { "sentence": ["You visited the iconic Louvre Pyramid, blending art and history in Paris.", "You engaged in professional growth at a formal event in Edmonton."], "paths": ["/pics/PXL_20250605_144006449.jpg", "/pics/PXL_20251005_192242139.MP.jpg"], "intentions": "Balance cultural exploration with career advancement this year." }, "June": { "sentence": ["You enjoyed the warm embrace of Italy\u2019s classic Margherita pizza.", "You proudly celebrated your Canadian citizenship, marking a new chapter."], "paths": ["/pics/PXL_20250605_164631460.jpg", "/pics/PXL_20251108_153720289.jpg"], "intentions": "Appreciate life\u2019s simple joys and honor new beginnings with pride." }, "July": { "sentence": ["You stood amidst Paris' grand halls, surrounded by timeless art and history.", "You connected with the echoes of the past through statues and ornate ceilings."], "paths": ["/pics/PXL_20250606_110127979.jpg"], "intentions": "Continue to seek knowledge and cultural enrichment in all your travels." }, "August": { "sentence": ["You paused by the Seine, letting the Eiffel Tower witness your thoughtful gaze.", "Your painted nails and silver chain caught the sun's gentle Parisian glow."], "paths": ["/pics/PXL_20250606_134402006.jpg"], "intentions": "Cherish moments of quiet reflection and express yourself authentically." }, "September": { "sentence": ["You captured the city's rhythm from a balcony overlooking the Seine.", "Your view painted a serene portrait of Parisian life and light."], "paths": ["/pics/PXL_20250607_110043096.jpg"], "intentions": "Embrace new perspectives and find beauty in everyday moments." }, "October": { "sentence": ["You stood beneath the Arc de Triomphe, marking a memorable Halloween night.", "Your peace sign shone brightly against the historic Parisian backdrop."], "paths": ["/pics/PXL_20250608_090325167.jpg"], "intentions": "Celebrate moments of joy and history, embracing life\u2019s unique experiences." }, "November": { "sentence": ["You carried the warmth of a freshly baked baguette through Parisian streets.", "Each step on the cobblestones whispered tales of simple pleasures and daily rhythms."], "paths": ["/pics/PXL_20250608_144201383.jpg"], "intentions": "Slow down to savor life\u2019s small, everyday joys and cultivate mindfulness." }, "December": { "sentence": ["You stood thoughtfully before London's Tower Bridge, amidst the chilly December air.", "The historic bridge framed your quiet reflection and sense of place."], "paths": ["/pics/PXL_20250610_103010819.jpg"], "intentions": "Find serenity in moments of stillness and deepen your appreciation for the world around you." } };

export const months: MonthData[] = [
  {
    id: "january",
    name: "January",
    season: "winter",
    images: [winter1, winter2],
    memory: "Quiet mornings with coffee while the snow fell softly outside. Started reading that book I bought last year.",
    resolution: "Start the year with patience. Drink more water.",
  },
  {
    id: "february",
    name: "February",
    season: "winter",
    images: [winter2, winter1],
    memory: "A short weekend trip to the cabin. The fireplace crackled all night.",
    resolution: "Focus on connection. Call friends more often.",
  },
  {
    id: "march",
    name: "March",
    season: "spring",
    images: [spring1, spring2],
    memory: "The first signs of green in the garden. Planted the new bulbs.",
    resolution: "Embrace growth. Learn one new skill this month.",
  },
  {
    id: "april",
    name: "April",
    season: "spring",
    images: [spring2, spring1],
    memory: "Rainy days spent organizing the studio. Found old photos.",
    resolution: "Clear the clutter, physical and mental.",
  },
  {
    id: "may",
    name: "May",
    season: "spring",
    images: [spring1, spring2],
    memory: "The park was in full bloom. Long walks after work.",
    resolution: "Move the body every day.",
  },
  {
    id: "june",
    name: "June",
    season: "summer",
    images: [summer1, summer2],
    memory: "First beach day of the year. The water was still cold but refreshing.",
    resolution: "Say yes to spontaneous plans.",
  },
  {
    id: "july",
    name: "July",
    season: "summer",
    images: [summer2, summer1],
    memory: "Late night bonfires and stargazing. The heat wave broke.",
    resolution: "Wake up early to catch the sunrise at least once.",
  },
  {
    id: "august",
    name: "August",
    season: "summer",
    images: [summer1, summer2],
    memory: "Family reunion. Laughter echoed through the backyard.",
    resolution: "Be present. Put the phone away.",
  },
  {
    id: "september",
    name: "September",
    season: "autumn",
    images: [autumn1, autumn2],
    memory: "The air turned crisp. Bought a new sweater and walked in the city.",
    resolution: "Refocus on career goals.",
  },
  {
    id: "october",
    name: "October",
    season: "autumn",
    images: [autumn2, autumn1],
    memory: "Pumpkin carving and golden leaves everywhere. Made soup from scratch.",
    resolution: "Cook at home more often.",
  },
  {
    id: "november",
    name: "November",
    season: "autumn",
    images: [autumn1, autumn2],
    memory: "Thanksgiving prep. The house smelled like cinnamon and apples.",
    resolution: "Practice gratitude daily.",
  },
  {
    id: "december",
    name: "December",
    season: "winter",
    images: [winter1, winter2],
    memory: "Holiday lights and wrapping gifts. Reflected on how fast the year went.",
    resolution: "Finish strong. Plan for the next adventure.",
  },
];
