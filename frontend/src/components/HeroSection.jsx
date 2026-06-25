export default function HeroSection() {
    return (
        <section className="font-[Roboto]">
            <div className="container mx-auto py-16">
                <div className="flex gap-10 items-center justify-between">
                    <div className="">
                        <button className="text-[15px] text-[#0f9cdb] bg-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2  "><span className="material-symbols-outlined bg-[#0f9cdb] text-white p-0.5 rounded-xl">
                            favorite
                        </span>Hệ thống y tế thông minh</button>
                        <h1 className="text-[50px] font-bold">Đặt lịch khám bệnh</h1>
                        <h1 className="text-[#0f9cdb] text-[50px] font-bold ">nhanh chóng & thông minh</h1>
                        <span className="text-[25px] font-normal ">Nền tảng đặt lịch khám bệnh trực tuyến hàng đầu,kết nối bạn với các bác sĩ giỏi và bệnh viện uy tín</span>
                        <div className="bg-white rounded-2xl p-2 shadow-lg flex items-center max-w-xl my-3">
                            <span className="material-symbols-outlined text-gray-400 px-3">
                                search
                            </span>

                            <input
                                type="text"
                                placeholder="Tìm bác sĩ, chuyên khoa..."
                                className="flex-1 py-3 outline-none"
                            />

                            <button className="bg-[#0f9cdb] text-white px-6 py-3 rounded-xl">
                                Tìm kiếm
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-4   rounded-2xl ">
                            <select className="outline-none px-4 py-3 border border-gray-200 rounded-xl min-w-[180px]">
                                <option>Chuyên khoa</option>
                            </select>

                            <input
                                type="date"
                                className="outline-none px-4 py-3 border border-gray-200 rounded-xl min-w-[180px]"
                            />

                            <select className="outline-none px-4 py-3 border border-gray-200 rounded-xl min-w-[180px]">
                                <option>Bệnh viện</option>
                            </select>
                            <button className="bg-[#0f9cdb] text-white px-8 py-3 rounded-xl flex items-center justify-center gap-2">
                                <span>Đặt lịch ngay</span>
                                <span className="flex items-center justify-center material-symbols-outlined">
                                    expand_circle_right
                                </span>
                            </button>

                        </div>
                    </div>
                    <div>
                        <img src="src/assets/doctor-banner.png" alt="#" className="w-[680px] h-auto"></img>
                    </div>
                </div>
            </div>
        </section>
    )
}