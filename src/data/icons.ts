// Extended icon set with keyboard/common symbols
export const iconOptions = [
  // Categories básicas
  'Home', 'Car', 'ShoppingCart', 'Utensils', 'GamepadIcon', 'Shirt', 
  'Heart', 'GraduationCap', 'Plane', 'Gift', 'Briefcase', 'Coins', 
  'PiggyBank', 'TrendingUp',
  
  // Símbolos de teclado comuns
  'AtSign', 'Hash', 'Percent', 'DollarSign', 'Euro', 'Pound',
  'Plus', 'Minus', 'X', 'Equal', 'Star', 'Circle',
  'Square', 'Triangle', 'Diamond', 'Hexagon',
  
  // Ícones adicionais úteis
  'Coffee', 'Pizza', 'Fuel', 'Zap', 'Wifi', 'Smartphone',
  'Laptop', 'Camera', 'Music', 'Video', 'Book', 'Pen',
  'Clock', 'Calendar', 'MapPin', 'Globe', 'Shield', 'Key',
  'Lock', 'Unlock', 'Eye', 'EyeOff', 'Bell', 'Mail',
  'Phone', 'MessageCircle', 'Users', 'User', 'Settings', 'Tool',
  'Wrench', 'Hammer', 'Scissors', 'Paperclip', 'Flag', 'Tag',
  'Bookmark', 'Archive', 'Download', 'Upload', 'Share', 'Copy',
  'Trash', 'Recycle', 'RotateCcw', 'RotateCw', 'Refresh', 'Power',
  'Volume', 'VolumeX', 'Mic', 'MicOff', 'Play', 'Pause',
  'Stop', 'SkipBack', 'SkipForward', 'FastForward', 'Rewind',
  'Sun', 'Moon', 'Cloud', 'CloudRain', 'Snowflake', 'Thermometer',
  'Battery', 'BatteryLow', 'Lightbulb', 'Flashlight', 'Candle',
  'Flower', 'Tree', 'Leaf', 'Flower2', 'Bug', 'Fish',
  'Dog', 'Cat', 'Bird', 'Rabbit', 'Turtle', 'Butterfly',
  'Apple', 'Cherry', 'Grape', 'Orange', 'Banana', 'Carrot',
  'Sandwich', 'IceCream', 'Cookie', 'Cake', 'Croissant', 'Donut',
  'Soup', 'Salad', 'Beef', 'Popcorn', 'Wine', 'Beer',
  'Baby', 'Gamepad2', 'Dices', 'Puzzle', 'Trophy', 'Medal',
  'Crown', 'Gem', 'Diamond2', 'Ring', 'Watch', 'Glasses',
  'Shirt2', 'ShirtIcon', 'Shoe', 'Hat', 'Bag', 'Backpack',
  'Umbrella', 'Tent', 'Compass', 'Mountain', 'Waves', 'Anchor',
  'Ship', 'Train', 'Bus', 'Truck', 'Bike', 'Scooter',
  'Rocket', 'Satellite', 'Construction', 'Factory', 'Building',
  'School', 'Hospital', 'Store', 'Bank', 'Hotel', 'Church'
]

export const getIconDisplay = (iconName: string) => {
  return iconName.charAt(0).toUpperCase() + iconName.slice(1)
}