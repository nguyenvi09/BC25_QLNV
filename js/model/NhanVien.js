function NhanVien(){
    //property
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _taiKhoan;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;

    //method
    this.tinhLuong = function(){
        if(this.chucVu === "Sếp"){
            this.tongLuong = this.luongCoBan * 3;
        }else if(this.chucVu === "Trưởng phòng"){
            this.tongLuong = this.luongCoBan * 2;
        }else{
            this.tongLuong = this.luongCoBan;
        };
    };
};