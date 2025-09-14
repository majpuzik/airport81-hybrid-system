export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="px-8 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">
                ✈️ Airport81 Admin Panel
              </h1>
              <div className="flex gap-2">
                <a 
                  href="/admin/css-editor" 
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
                >
                  🎨 CSS Editor
                </a>
              </div>
            </div>
            <div className="flex gap-2">
              <a 
                href="http://localhost:3000" 
                target="_blank"
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200"
              >
                🚀 Zobrazit web
              </a>
              <a 
                href="http://localhost:8081/wp-admin" 
                target="_blank"
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200"
              >
                WordPress Admin
              </a>
            </div>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}