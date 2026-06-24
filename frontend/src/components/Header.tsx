
export default function Header() {
  return (
    <nav className="mt-6 font-[Roboto] px-2">
      <div className="max-w-6xl mx-auto flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2" >
          <a href="#"><span className="material-symbols-outlined bg-[#0f9cdb] text-white p-2 rounded-lg">
            favorite
          </span></a>
          <div>
            <a href="#" className="text-[#236ddd] text-lg font-bold">
              MediCare+
            </a>
            <span className="block text-xs text-gray-500">
              Smart Healthcare
            </span>
          </div>
        </div>
        <ul className=" hidden lg:flex items-center">
          <li><a href="" className="block px-3 py-2 ">Trang chủ</a></li>
          <li><a href="" className="block px-3 py-2 ">Bác sĩ</a></li>
          <li><a href="" className="block px-3 py-2 ">Cơ sở y tế</a></li>
          <li><a href="" className="block px-3 py-2 ">Chuyên khoa</a></li>
          <li><a href="" className="block px-3 py-2 ">Tin tức</a></li>
          <li><a href="" className="block px-3 py-2 ">Liên hệ</a></li>
        </ul>
        <div className="flex items-center text-gray-500 gap-6">
          <span className="material-symbols-outlined">
            search
          </span>
          <span className="material-symbols-outlined">
            notifications
          </span>
          <span className="material-symbols-outlined">
            chat_bubble
          </span>
          <button className="px-3 py-2 flex gap-2 bg-[#236ddd] text-white rounded-lg"><span className="material-symbols-outlined">
            calendar_today
          </span>Đặt lịch</button>
        </div>
      </div>
    </nav>
  );
}
