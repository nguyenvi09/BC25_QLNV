function DanhSachNhanVien(){
    this.arr = [];

    this.themNV = function(nhanVien){
        this.arr.push(nhanVien);
    };

    this.timViTriNV = function(taiKhoan){
        var index = -1;
        for(i = 0; i < this.arr.length; i++){
            var nhanVien = this.arr[i];
            if(nhanVien.taiKhoan === taiKhoan){
                index = i;
                break;
            };
        };
        return index;
    };

    this.xoaNV = function(taiKhoan){
        var index = this.timViTriNV(taiKhoan);
        if(index !== -1){
            this.arr.splice(index, 1);
        };
    };

    this.layThongTinNV = function (taiKhoan) {
        //Tim vi tri
        var index = this.timViTriNV(taiKhoan);
    
        if (index !== -1) {
          //lấy thông tin nhân viên
          var nhanVien = this.arr[index];
          return nhanVien;
        }
        return null;
      };

    this.capNhatNV = function(nhanVien){
        var index = this.timViTriNV(nhanVien.taiKhoan);
        if(index !== -1){
            this.arr[index] = nhanVien;
        };
    };
};