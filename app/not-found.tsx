import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen cultural-pattern flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border-4 border-yellow-500 shadow-xl max-w-md w-full text-center">
        <h2 className="text-6xl font-extrabold text-yellow-400 mb-2">404</h2>
        <h3 className="text-2xl font-bold text-white text-shadow mb-2 font-amharic">
          ገጹ አልተገኘም
        </h3>
        <p className="text-white text-base opacity-90 mb-6">
          Page Not Found — The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:scale-105"
        >
          Return Home / ወደ ዋናው ገጽ
        </Link>
      </div>
    </div>
  )
}
