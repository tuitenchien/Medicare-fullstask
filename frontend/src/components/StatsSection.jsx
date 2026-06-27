export default function StatsSection() {
    return (
        <section>
            <div className="container mx-auto -mt-6">
                <div className="flex">
                    <div className="flex-1 flex items-center gap-4 p-6 border-r">
                        <img src="/src/assets/doctor.png" className="size-15 rounded-md" />

                        <div>
                            <h3 className="text-3xl font-bold text-gray-900">
                                1,250+
                            </h3>

                            <p className="font-semibold">
                                Bác sĩ chuyên gia
                            </p>

                            <span className="text-gray-500 text-sm">
                                Giàu kinh nghiệm
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center gap-4 p-6 border-r">
                        <img src="/src/assets/hospital.png" className="size-15 rounded-md" />

                        <div>
                            <h3 className="text-3xl font-bold text-gray-900">
                                150+
                            </h3>

                            <p className="font-semibold">
                                Bệnh viện liên kết
                            </p>

                            <span className="text-gray-500 text-sm">
                                Uy tín hàng đầu
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center gap-4 p-6 border-r">
                        <img src="/src/assets/LK.png" className="size-15 rounded-md" />

                        <div>
                            <h3 className="text-3xl font-bold text-gray-900">
                                50,000+
                            </h3>

                            <p className="font-semibold">
                                Lượt khám bệnh
                            </p>

                            <span className="text-gray-500 text-sm">
                                Mỗi tháng
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center gap-4 p-6">
                        <img src="/src/assets/star.png" className="size-10" />

                        <div>
                            <h3 className="text-3xl font-bold text-gray-900">
                                4.9/5.0
                            </h3>

                            <p className="font-semibold">
                                Đánh giá người dùng
                            </p>

                            <span className="text-gray-500 text-sm">
                                Từ 10,000+ đánh giá
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}