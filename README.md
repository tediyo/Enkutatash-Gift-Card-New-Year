# 🌺 Enkutatash Greeting Card Creator

A beautiful web application for creating and sharing Ethiopian New Year (Enkutatash) greeting cards with cultural designs and Amharic text support.

## ✨ Features

### 🎨 **Beautiful Design**
- Traditional Ethiopian colors and cultural patterns
- Meskel flower themes and cultural motifs
- Responsive design for all devices
- Smooth animations with Framer Motion

### 🎯 **Card Creation**
- Multiple template options (Meskel Flowers, Cultural Pattern, Golden Sunrise, Ethiopian Pride)
- Custom name and message input
- Amharic text support with proper fonts
- Live preview of your greeting card

### 📱 **Sharing & Export**
- Download cards as high-quality PNG images
- Share via WhatsApp, Telegram, and email
- Copy link functionality
- Social media preview

### ⏰ **Countdown Timer**
- Live countdown to Ethiopian New Year 2024
- Beautiful animated display

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom Ethiopian color palette
- **Animations**: Framer Motion
- **Image Export**: html2canvas
- **Fonts**: Google Fonts (Abyssinica SIL, Noto Sans Ethiopic)
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd enkutatash-greeting-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
enkutatash-greeting-app/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main landing page
├── components/
│   ├── CardPreview.tsx      # Live card preview component
│   ├── CountdownTimer.tsx   # Ethiopian New Year countdown
│   ├── ExportableCard.tsx   # High-res card for export
│   ├── ShareOptions.tsx     # Sharing functionality
│   ├── TemplatePicker.tsx   # Template selection
│   └── TextInput.tsx        # Custom input components
├── utils/
│   └── exportCard.ts        # Card export utilities
└── public/
    └── images/              # Template images and assets
```

## 🎨 Customization

### Adding New Templates
1. Add template to the `templates` array in `app/page.tsx`
2. Define background gradient and pattern styles
3. Add preview icon/emoji

### Styling
- Custom colors defined in `tailwind.config.js`
- Cultural patterns in `app/globals.css`
- Component-specific styles in individual files

### Fonts
- Amharic fonts loaded from Google Fonts
- Custom font families in Tailwind config

## 🌍 Cultural Elements

### Colors
- **Ethiopian Red**: #DA1212
- **Ethiopian Yellow**: #FCDD09  
- **Ethiopian Green**: #078930
- **Meskel Gold**: #FFD700
- **Cultural Orange**: #FF6B35

### Patterns
- Meskel flower motifs
- Traditional cultural patterns
- Ethiopian flag-inspired designs
- Sunrise/sunset themes

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Ethiopian cultural community for inspiration
- Google Fonts for Amharic font support
- Framer Motion for smooth animations
- Next.js team for the amazing framework

---

**Happy Enkutatash!** 🎉  
*እንኳን ለአዲሱ ዓመት በዓል አደረሰዎ!*
