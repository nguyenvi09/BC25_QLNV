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

    //tìm theo loại
    /**
     * Khi tìm có 2 trường hợp: 
     * TH1: tìm được !== null
     * TH2: không tìm được return null
     * b1: tạo mangTimKiem = [];
     * b2: duyệt mảng -> lấy ra duoc đối tượng nhanVien = arr[i]
     * b3: nếu nhanVien.xepLoai trùng với keyWord -> tìm thấy
     * => thêm nhanVien vô mangTimKiem()
     * mangTimKiem.push(nhanVien)
     * b4: trả về mangTimKiem
     */
    this.timTheoLoai = function(keyWord){
        var mangTimKiem = [];
        for(i = 0; i < this.arr.length; i++){
            var nhanVien = this.arr[i];
            //toLowerCase() sẽ chuyển hết về chữ thường
            //indexOf() sẽ tìm kiếm tương đối
            // đk khác -1 -> tìm thấy dựa vào giá trị trả về của hàm indexOf
            if(nhanVien.xepLoai.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1){
                mangTimKiem.push(nhanVien);
            };
        };
        return mangTimKiem;
    };
};