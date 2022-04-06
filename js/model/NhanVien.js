
function NhanVien(_taiKhoan, _hoTen, _email, _matKhau, _ngayLam,
    _luongCB, _chucVu, _gioLam){
    //property
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";

    //method
    this.tinhLuong = function(){
        if(this.chucVu == "Sếp"){
            this.tongLuong = this.luongCB * 3;
        }else if(this.chucVu == "Trưởng phòng"){
            this.tongLuong = this.luongCB * 2;
        }else if(this.chucVu == "Nhân viên"){
            this.tongLuong = this.luongCB;
        };
    };


    /**
     * if gioLam >= 192 -> nhân viên xuất sắc
     * gioLam >= 176 -> nhân viên giỏi
     * gioLam >= 160 -> nv khá
     * gioLam < 160 -> nv trung bình
     *  */ 

    this.xepLoai = function () {
        if(this.gioLam >= 192){
            this.xepLoai = "Xuất sắc";
        }else if(this.gioLam >= 176 && this.gioLam < 192){
            this.xepLoai = "Giỏi";
        }else if(this.gioLam >= 160 && this.gioLam < 176){
            this.xepLoai = "Khá";
        }else{
            this.xepLoai = "Trung bình";
        };
    };
};