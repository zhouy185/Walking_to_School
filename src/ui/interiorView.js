/**
 * Rich, kid-friendly interior views for public-access buildings
 * (restaurant, cafe/bakery, grocery, library, shop, church, pharmacy, bank, school).
 */

const PLACE_THEMES = {
  restaurant: {
    badge: '🍽️ Restaurant',
    bg: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 60%, #92400e 60%, #78350f 100%)',
    greeting: 'Welcome in! Smell those delicious hot meals cooking in the kitchen!',
    funLabel: '🍕 Check the Kids Menu',
    funLines: [
      'Today’s special: Homemade Pizza, Warm Soup & Fresh Lemonade!',
      'The chef waves hello from the kitchen window! 👨‍🍳',
      'Don’t forget to wash your hands before eating!',
    ],
    svg: `
      <svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg" class="interior-svg">
        <rect width="600" height="145" fill="#fff7ed"/>
        <rect y="145" width="600" height="85" fill="#9a3412"/>
        <!-- Hanging pendant lights -->
        <line x1="150" y1="0" x2="150" y2="42" stroke="#451a03" stroke-width="4"/>
        <path d="M126 42 Q150 22 174 42 Z" fill="#f59e0b"/>
        <circle cx="150" cy="46" r="7" fill="#fef08a"/>
        <line x1="300" y1="0" x2="300" y2="42" stroke="#451a03" stroke-width="4"/>
        <path d="M276 42 Q300 22 324 42 Z" fill="#f59e0b"/>
        <circle cx="300" cy="46" r="7" fill="#fef08a"/>
        <line x1="450" y1="0" x2="450" y2="42" stroke="#451a03" stroke-width="4"/>
        <path d="M426 42 Q450 22 474 42 Z" fill="#f59e0b"/>
        <circle cx="450" cy="46" r="7" fill="#fef08a"/>
        <!-- Menu board -->
        <rect x="215" y="58" width="170" height="68" rx="8" fill="#1e293b" stroke="#b45309" stroke-width="5"/>
        <text x="300" y="84" text-anchor="middle" fill="#fde047" font-size="16" font-weight="900">TODAY'S MENU</text>
        <text x="300" y="106" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">🍕 Pizza  •  🍜 Noodles  •  🥗 Salad</text>
        <!-- Dining tables & booths -->
        <rect x="45" y="128" width="130" height="58" rx="10" fill="#dc2626"/>
        <rect x="75" y="142" width="115" height="14" rx="4" fill="#fef9c3"/>
        <text x="132" y="138" text-anchor="middle" font-size="22">🍝</text>
        <rect x="425" y="128" width="130" height="58" rx="10" fill="#dc2626"/>
        <rect x="410" y="142" width="115" height="14" rx="4" fill="#fef9c3"/>
        <text x="468" y="138" text-anchor="middle" font-size="22">🍔</text>
      </svg>
    `,
  },
  cafe: {
    badge: '☕ Café & Bakery',
    bg: 'linear-gradient(180deg, #ffedd5 0%, #fed7aa 60%, #78350f 60%, #451a03 100%)',
    greeting: 'Welcome! Fresh pastries, hot cocoa, and warm bread just came out of the oven!',
    funLabel: '🥐 Peek at the Pastry Case',
    funLines: [
      'Cinnamon buns, chocolate muffins, and warm croissants! 🥐🧁',
      'The baker gives you a big friendly wave! 👋',
      'Hot chocolate with marshmallows is the neighborhood favorite!',
    ],
    svg: `
      <svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg" class="interior-svg">
        <rect width="600" height="142" fill="#fef3c7"/>
        <rect y="142" width="600" height="88" fill="#78350f"/>
        <!-- Chalkboard menu -->
        <rect x="165" y="24" width="270" height="72" rx="8" fill="#1f2937" stroke="#92400e" stroke-width="5"/>
        <text x="300" y="54" text-anchor="middle" fill="#fde047" font-size="18" font-weight="900">FRESH BAKERY &amp; CAFÉ</text>
        <text x="300" y="78" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="700">🥐 Croissants  •  🍩 Donuts  •  ☕ Hot Cocoa</text>
        <!-- Pastry display counter -->
        <rect x="95" y="114" width="410" height="92" rx="10" fill="#b45309"/>
        <rect x="118" y="122" width="220" height="58" rx="8" fill="#e0f2fe" opacity="0.88" stroke="#ffffff" stroke-width="3"/>
        <text x="162" y="160" text-anchor="middle" font-size="28">🥐</text>
        <text x="228" y="160" text-anchor="middle" font-size="28">🍩</text>
        <text x="294" y="160" text-anchor="middle" font-size="28">🧁</text>
        <!-- Espresso machine -->
        <rect x="372" y="102" width="95" height="56" rx="8" fill="#475569"/>
        <rect x="386" y="114" width="66" height="20" rx="4" fill="#cbd5e1"/>
        <text x="418" y="152" text-anchor="middle" font-size="22">☕</text>
      </svg>
    `,
  },
  grocery: {
    badge: '🛒 Grocery & Market',
    bg: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 62%, #cbd5e1 62%, #94a3b8 100%)',
    greeting: 'Welcome to the market! Aisles of fresh fruits, veggies, and healthy school snacks!',
    funLabel: '🍎 Pick a Healthy Snack',
    funLines: [
      'Crunchy red apples, sweet bananas, and juicy strawberries! 🍎🍌🍓',
      'Fresh bread, milk, and veggies are all stocked up in Aisle 2!',
      'Don’t forget your reusable grocery bag! 🛍️',
    ],
    svg: `
      <svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg" class="interior-svg">
        <rect width="600" height="145" fill="#f0fdf4"/>
        <rect y="145" width="600" height="85" fill="#e2e8f0"/>
        <!-- Aisle signs -->
        <rect x="55" y="20" width="140" height="34" rx="8" fill="#16a34a"/>
        <text x="125" y="42" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="900">FRESH PRODUCE</text>
        <rect x="230" y="20" width="140" height="34" rx="8" fill="#2563eb"/>
        <text x="300" y="42" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="900">BAKERY &amp; DAIRY</text>
        <rect x="405" y="20" width="140" height="34" rx="8" fill="#ea580c"/>
        <text x="475" y="42" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="900">CHECKOUT LANE</text>
        <!-- Produce stands -->
        <rect x="42" y="110" width="165" height="72" rx="10" fill="#15803d"/>
        <text x="80" y="142" text-anchor="middle" font-size="26">🍎</text>
        <text x="125" y="142" text-anchor="middle" font-size="26">🍌</text>
        <text x="170" y="142" text-anchor="middle" font-size="26">🥦</text>
        <rect x="228" y="88" width="145" height="94" rx="8" fill="#94a3b8"/>
        <text x="268" y="128" text-anchor="middle" font-size="24">🥛</text>
        <text x="330" y="128" text-anchor="middle" font-size="24">🍞</text>
        <text x="300" y="166" text-anchor="middle" font-size="24">🧀</text>
        <rect x="415" y="124" width="140" height="60" rx="8" fill="#334155"/>
        <text x="485" y="160" text-anchor="middle" font-size="28">🛒</text>
      </svg>
    `,
  },
  library: {
    badge: '📚 Public Library',
    bg: 'linear-gradient(180deg, #e0f2fe 0%, #bae6fd 60%, #92400e 60%, #78350f 100%)',
    greeting: 'Shhh... welcome to the library! Rows of adventure stories, science books, and cozy reading tables!',
    funLabel: '📖 Browse the Bookshelves',
    funLines: [
      'You found a cool book about space rockets and planets! 🚀',
      'There’s a whole shelf of graphic novels and mysteries!',
      'The librarian smiles and stamps your pretend library card! 📚',
    ],
    svg: `
      <svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg" class="interior-svg">
        <rect width="600" height="150" fill="#f0f9ff"/>
        <rect y="150" width="600" height="80" fill="#a16207"/>
        <!-- Bookshelves -->
        <rect x="40" y="30" width="150" height="125" rx="6" fill="#78350f"/>
        <rect x="225" y="30" width="150" height="125" rx="6" fill="#78350f"/>
        <rect x="410" y="30" width="150" height="125" rx="6" fill="#78350f"/>
        <!-- Colorful book spines -->
        <rect x="52" y="42" width="126" height="22" rx="3" fill="#ef4444"/>
        <rect x="52" y="74" width="126" height="22" rx="3" fill="#3b82f6"/>
        <rect x="52" y="106" width="126" height="22" rx="3" fill="#22c55e"/>
        <rect x="237" y="42" width="126" height="22" rx="3" fill="#f59e0b"/>
        <rect x="237" y="74" width="126" height="22" rx="3" fill="#a855f7"/>
        <rect x="237" y="106" width="126" height="22" rx="3" fill="#06b6d4"/>
        <rect x="422" y="42" width="126" height="22" rx="3" fill="#ec4899"/>
        <rect x="422" y="74" width="126" height="22" rx="3" fill="#10b981"/>
        <rect x="422" y="106" width="126" height="22" rx="3" fill="#eab308"/>
        <!-- Reading table -->
        <rect x="195" y="168" width="210" height="20" rx="6" fill="#fef3c7"/>
        <text x="300" y="165" text-anchor="middle" font-size="26">📖</text>
      </svg>
    `,
  },
  church: {
    badge: '⛪ Community Place of Worship',
    bg: 'linear-gradient(180deg, #eef2ff 0%, #e0e7ff 62%, #78350f 62%, #451a03 100%)',
    greeting: 'A peaceful, sunlit hall with colorful stained-glass windows.',
    funLabel: '✨ Admire the Stained Glass',
    funLines: [
      'Sunlight shines through the colorful arched windows in blues, golds, and reds!',
      'It’s super calm and quiet inside.',
      'A welcoming community landmark right in Westdale!',
    ],
    svg: `
      <svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg" class="interior-svg">
        <rect width="600" height="150" fill="#eef2ff"/>
        <rect y="150" width="600" height="80" fill="#78350f"/>
        <!-- Stained glass windows -->
        <path d="M130 135 L130 60 Q170 20 210 60 L210 135 Z" fill="#60a5fa" stroke="#312e81" stroke-width="5"/>
        <path d="M260 135 L260 45 Q300 5 340 45 L340 135 Z" fill="#facc15" stroke="#312e81" stroke-width="5"/>
        <path d="M390 135 L390 60 Q430 20 470 60 L470 135 Z" fill="#f472b6" stroke="#312e81" stroke-width="5"/>
        <!-- Wooden benches -->
        <rect x="85" y="168" width="180" height="22" rx="6" fill="#92400e"/>
        <rect x="335" y="168" width="180" height="22" rx="6" fill="#92400e"/>
      </svg>
    `,
  },
  pharmacy: {
    badge: '💊 Pharmacy & Health',
    bg: 'linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 62%, #cbd5e1 62%, #94a3b8 100%)',
    greeting: 'Welcome to the neighborhood pharmacy! Clean shelves and a friendly pharmacist at the counter.',
    funLabel: '🩺 Wave to the Pharmacist',
    funLines: [
      'The pharmacist waves hello and reminds you to stay hydrated on your walk!',
      'Band-aids, sunscreen, and vitamins are neatly organized on the shelves.',
      'Have a safe and healthy day at school!',
    ],
    svg: `
      <svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg" class="interior-svg">
        <rect width="600" height="145" fill="#f0fdfa"/>
        <rect y="145" width="600" height="85" fill="#cbd5e1"/>
        <rect x="195" y="25" width="210" height="44" rx="10" fill="#0d9488"/>
        <text x="300" y="53" text-anchor="middle" fill="#ffffff" font-size="18" font-weight="900">➕ PHARMACY</text>
        <rect x="110" y="112" width="380" height="72" rx="10" fill="#ffffff" stroke="#0d9488" stroke-width="4"/>
        <text x="300" y="156" text-anchor="middle" font-size="30">💊  🧴  🩹</text>
      </svg>
    `,
  },
  bank: {
    badge: '🏦 Neighborhood Bank',
    bg: 'linear-gradient(180deg, #eff6ff 0%, #dbeafe 62%, #cbd5e1 62%, #94a3b8 100%)',
    greeting: 'Welcome to the bank! Bright teller counters and a big shiny vault door in the back.',
    funLabel: '🪙 Check Your Piggy Bank Tip',
    funLines: [
      'Saving a little bit each week helps your piggy bank grow! 🐷',
      'The friendly teller waves hello from behind the counter!',
      'Remember to look both ways when you head back out onto King Street!',
    ],
    svg: `
      <svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg" class="interior-svg">
        <rect width="600" height="145" fill="#eff6ff"/>
        <rect y="145" width="600" height="85" fill="#cbd5e1"/>
        <rect x="180" y="22" width="240" height="42" rx="10" fill="#1d4ed8"/>
        <text x="300" y="49" text-anchor="middle" fill="#ffffff" font-size="17" font-weight="900">🏦 TELLER COUNTER</text>
        <rect x="90" y="115" width="420" height="70" rx="10" fill="#1e3a8a"/>
        <text x="300" y="158" text-anchor="middle" font-size="30">💳  🪙  🏛️</text>
      </svg>
    `,
  },
  shop: {
    badge: '🛍️ Westdale Shop',
    bg: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 62%, #d6d3d1 62%, #a8a29e 100%)',
    greeting: 'Welcome to this friendly Westdale local shop! Colorful displays and neat shelves everywhere!',
    funLabel: '🎁 Browse the Displays',
    funLines: [
      'So many cool local items on display in the storefront window! ✨',
      'The shopkeeper says: "Thanks for stopping by! Have a great walk to school!"',
      'Supporting local Westdale shops makes the neighborhood lively!',
    ],
    svg: `
      <svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg" class="interior-svg">
        <rect width="600" height="145" fill="#faf5ff"/>
        <rect y="145" width="600" height="85" fill="#d6d3d1"/>
        <rect x="65" y="45" width="150" height="105" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="4"/>
        <text x="140" y="106" text-anchor="middle" font-size="32">📚 🎨</text>
        <rect x="245" y="45" width="150" height="105" rx="8" fill="#ffffff" stroke="#ec4899" stroke-width="4"/>
        <text x="320" y="106" text-anchor="middle" font-size="32">🚲 👟</text>
        <rect x="425" y="105" width="125" height="75" rx="8" fill="#6d28d9"/>
        <text x="488" y="150" text-anchor="middle" font-size="28">🛍️</text>
      </svg>
    `,
  },
};

export function getInteriorTheme(placeType) {
  return PLACE_THEMES[placeType] || PLACE_THEMES.shop;
}
