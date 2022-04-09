function Validation(){
    this.kiemTraRong = function(value, spanID, mess){
        if(value === ""){
            //xuất thông báo lỗi
            getEle(spanID).innerHTML = mess;
            getEle(spanID).style.display = "block";
            return false;
        };
        return true;
        // else{
        //     getEle(spanID).innerHTML = "";
        //     getEle(spanID).style.display = "none";
        //     return true;
    };

    //hàm kiểm tra bắt buộc nhập số từ 4->6
    this.kiemTraSo = function(value, spanID, mess){
        var numbers = /^[0-9]+$/;
        //kiểm tra rỗng trước
        if(this.kiemTraRong(value, spanID, mess)){
            //hàm match sẽ return về 1 mảng
            if(value.match(numbers)){
                if(value.length >= 4 && value.length <= 6){
                    // dữ liệu hợp lệ 
                    getEle(spanID).style.display = "none";
                    getEle(spanID).innerHTML = "";
                    return true;
                }else{
                    getEle(spanID).style.display = "block";
                    getEle(spanID).innerHTML = mess;
                    return false;   
                };
            }else{
                getEle(spanID).style.display = "block";
                getEle(spanID).innerHTML = mess;
                return false;
            };
        }else{
            getEle(spanID).style.display = "block";
            getEle(spanID).innerHTML = mess;
            return false;
        };
    };

    //kiểm tra tên nhân viên ^[A-Za-z]+$
    this.kiemTraTen = function(value, spanID, mess){
        //sử dụng lớp đối tượng RegExp js kiểm tra
        var letters = new RegExp("^[a-zA-Z].*[\s\.]*$");
        if(this.kiemTraRong(value, spanID, mess)){
            if(letters.test(value)){
                //dl hợp lệ
                getEle(spanID).innerHTML = "";
                getEle(spanID).style.display = "none";
                return true;
            }else{
                getEle(spanID).innerHTML = mess;
                getEle(spanID).style.display = "block";
                return false;
            };
        }else{
            getEle(spanID).innerHTML = mess;
            getEle(spanID).style.display = "block";
            return false;
        };
    };

    //kiểm tra email hợp lệ
    this.kiemTraEmail = function(value, spanID, mess){
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.kiemTraRong(value, spanID, mess)){
            if(value.match(mailFormat)){
                getEle(spanID).innerHTML = "";
                getEle(spanID).style.display = "none";
                return true;
            }else{
                getEle(spanID).innerHTML = mess;
                getEle(spanID).style.display = "block";
                return false;
            };
        }else{
            getEle(spanID).innerHTML = mess;
            getEle(spanID).style.display = "block";
            return false;
        };
    };

    //kiểm tra mật khẩu
    this.kiemTraMK = function(value, spanID, mess){
        var checkPass = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,10}$/;
        if(this.kiemTraRong(value, spanID, mess)){
            if(value.match(checkPass)){
                getEle(spanID).innerHTML = "";
                getEle(spanID).style.display = "none";
                return true;
            }else{
                getEle(spanID).innerHTML = mess;
                getEle(spanID).style.display = "block";
                return false;
            };
        }else{
            getEle(spanID).innerHTML = mess;
            getEle(spanID).style.display = "block";
            return false;
        };
    };

    //kiểm tra lương cơ bản
    this.kiemTraLuong = function(value, spanID, mess){
        if(this.kiemTraRong(value, spanID, mess)){
            if(value >= 1000000 && value <= 20000000){
                getEle(spanID).innerHTML = "";
                getEle(spanID).style.display = "none";
                return true;
            }else{
                getEle(spanID).innerHTML = mess;
                getEle(spanID).style.display = "block";
                return false;
            };
        }else{
            getEle(spanID).innerHTML = mess;
            getEle(spanID).style.display = "block";
            return false;
        };
    };

    // kiểm tra chức vụ
    this.kiemTraChucVu = function(value, spanID, mess){
        if(this.kiemTraRong(value, spanID, mess)){
            if(value !== "Chọn chức vụ"){
                getEle(spanID).innerHTML = "";
                getEle(spanID).style.display = "none";
                return true;
            }else{
                getEle(spanID).innerHTML = mess;
                getEle(spanID).style.display = "block";
                return false;
            };
        }else{
            getEle(spanID).innerHTML = mess;
            getEle(spanID).style.display = "block";
            return false;
        };
    };

    //kiểm tra số giờ làm trong tháng
    this.kiemTraGioLam = function(value, spanID, mess){
        if(this.kiemTraRong(value, spanID, mess)){
            if(value >= 80 && value <= 200){
                getEle(spanID).innerHTML = "";
                getEle(spanID).style.display = "none";
                return true;
            }else{
                getEle(spanID).innerHTML = mess;
                getEle(spanID).style.display = "block";
                return false;
            };
        }else{
            getEle(spanID).innerHTML = mess;
            getEle(spanID).style.display = "block";
            return false;
        };
    };
};