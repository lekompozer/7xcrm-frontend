export default function Header() {
    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex flex-1 items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                        7x CRM Admin Dashboard
                    </h2>
                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    {/* User menu */}
                    <div className="flex items-center gap-x-4">
                        <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                        <span className="text-sm font-medium text-gray-700">Admin User</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
