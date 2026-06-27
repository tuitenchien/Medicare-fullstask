export default function HospitalSection() {
    return (
        <section className="font-bold">
            <h1 className="text-2xl font-bold m-4">Cơ sở y tế nổi bật</h1>
            <div className="flex gap-2">
                <div className="bg-white w-[300px] h-[300px] shadow-xl flex flex-col items-center gap-2 rounded-lg">
                    <img src="src/assets/benh-viendktb-1752120130.jpg" className="rounded-xl"></img>
                    <span className="text-center text-xl">
                        Bệnh viện đa khoa Thái Bình
                    </span>
                    <span className="text-center text-gray-500">
                        Số 530 đường Lý Bôn, Phường Quang Trung, Thành phố Thái Bình, Tỉnh Thái Bình
                    </span>
                </div>
                <div className="bg-white w-[300px] h-[300px] shadow-xl flex flex-col items-center gap-2 rounded-lg">
                    <img src="src/assets/benhvienps.jpg" className="rounded-xl w-full h-[169px] object-cover"></img>
                    <span className="text-center text-xl">
                        Bệnh viện phụ sản Thái Bình
                    </span>
                    <span className="text-center text-gray-500">
                        Số 530A, Đường Lý Bôn, Phường Trần Hưng Đạo, Thành phố Thái Bình
                    </span>
                </div>
                <div className="bg-white w-[300px] h-[300px] shadow-xl flex flex-col items-center gap-2 rounded-lg">
                    <img src="src/assets/benh-vien-mat-thai-binh.jpg" className="rounded-xl w-full h-[169px] object-cover"></img>
                    <span className="text-center text-xl">
                        Bệnh viện mắt Thái Bình
                    </span>
                    <span className="text-center text-gray-500">
                        Số 365 Trần Lãm,Tỉnh Thái Bình
                    </span>
                </div>
                <div className="bg-white w-[300px] h-[300px] shadow-xl flex flex-col items-center gap-2 rounded-lg">
                    <img src="src/assets/z6670656389508_cdd018c6baa475678d6f5b67afc0cbab-1.jpg" className="rounded-xl w-full h-[169px] object-cover"></img>
                    <span className="text-center text-xl">
                        Bệnh viện đa khoa quốc tế Hà Nội-Quảng Ninh 
                    </span>
                    <span className="text-center text-gray-500">
                        414 Đường Quang Trung, Phường Uông Bí, Tỉnh Quảng Ninh
                    </span>
                </div>
            </div>
        </section>
    )
}