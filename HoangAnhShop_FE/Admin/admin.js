import API_ENDPOINSADMIN from "./apiadmin.js";  // Đảm bảo rằng apiadmin.js nằm cùng thư mục với admin.js
//#region LOGOUT
window.LogoutAccount = function () {
    const token = localStorage.getItem("token");

    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }

    console.log("Token gửi đi:", token); 
    fetch("https://localhost:7231/api/Account/Logout", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,   
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        console.log("Trạng thái response:", response.status);  
        if (!response.ok) {
            throw new Error(`Lỗi từ server: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log("Kết quả trả về:", data);
        showAlert("Đăng xuất thành công");
        localStorage.removeItem("token");   
        window.location.href = "/fruitables-1.0.0/index.html";  
    })
    .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
        alert(error.message || "Có lỗi xảy ra","alert-danger");
    });
};
//#region  bảo vệ 
    const token = localStorage.getItem("token"); 

        const userInfo = parseJwt(token);
          const role =
            userInfo[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
        
   
          if(role!="Admin"){
              window.location.href = "/fruitables-1.0.0/index.html"
          
         
          }
    function parseJwt(token) {
        try {
        
          const base64Url = token.split(".")[1]; 
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
      
          return JSON.parse(jsonPayload);
        } catch (error) {
          console.error("Token không hợp lệ:", error.message);
          return null;
        }
      }
      document.addEventListener('DOMContentLoaded', function () {
        // Lắng nghe sự kiện khi nút Đóng được nhấn
        document.querySelectorAll('.close-btn').forEach(button => {
            button.addEventListener('click', function () {
                // Tìm thẻ collapse chứa nút này
                const collapse = this.closest('.collapse');
                // Đóng collapse (gỡ bỏ class 'show')
                collapse.classList.remove('show');
            });
        });
    });
//#endregion
//#region  danhmuc
danhmuc();
function danhmuc (){
    
fetch(API_ENDPOINSADMIN.Danhmuc)
.then((p) => {
  if (!p.ok) {
    window.location.href = `http://127.0.0.1:5500/fruitables-1.0.0/404.html`;
    return;
  }

  return p.json();
})
.then((data) => {

  const danhmucsp = document.querySelector(".danhsachdanhmuc");
  const danhmucoption = document.getElementById("sanphamdmoptione");
  const danhmucoptio= document.getElementById("sanphamdmoption");
  const danhmucoptio2= document.getElementById("sanphamdmoption2");
  const tendanhmucs= document.getElementById("tendanhmucs");
  danhmucsp.innerHTML="";
  danhmucoption.innerHTML="";
  danhmucoptio2.innerHTML="";
  danhmucoptio.innerHTML="";
  tendanhmucs.innerHTML="";
  data.forEach((p) => {
   
      danhmucsp.innerHTML+=` <tr class="">
          <th scope="row">${p.id_danhmuc}</th>
          <td colspan="2">${p.ten_danhmuc}</td>
          <td>${p.mota_danhmuc}</td>
          <td> 
<a href="#" class="btn btn-info mx-2" onclick="editdmshow(${p.id_danhmuc}, '${p.ten_danhmuc}', '${p.mota_danhmuc}')">Sửa</a>
          <a href="#" class="btn btn-danger" onclick="xoadanhmuc(${p.id_danhmuc},'${p.ten_danhmuc}')">Xoá</a>
          </td>
        </tr>`;
            
        danhmucoption.innerHTML+=`<option value="${p.id_danhmuc}">${p.ten_danhmuc}</option>`;
        danhmucoptio2.innerHTML+=`<option value="${p.ten_danhmuc}">${p.ten_danhmuc}</option>`;
            danhmucoptio.innerHTML+=`<option value="${p.id_danhmuc}">${p.ten_danhmuc}</option>`;
            tendanhmucs.innerHTML+=`<option value="${p.ten_danhmuc}">${p.ten_danhmuc}</option>`;

    });

  });
}

function showLoading(){
    // TODO Sau em thay logic để hiện loading lên giao diện nhé
    console.log("show loading")
}

function hideLoading(){
    // TODO Sau em thay logic để ẩn loading trên giao diện nhé
    console.log("hide loading")
}
window.editdmshow = function(id, name, mt){
   
 document.getElementById("madanhmuc2").value;
     document.getElementById("tendanhmuc2").value;
     document.getElementById("motadanhmuc2").value;
    
  
    document.getElementById("madanhmuc2").value = id;  
    document.getElementById("tendanhmuc2").value = name;  
    document.getElementById("motadanhmuc2").value = mt;  


    var showeditdanhmuc = document.getElementById("danhmucnav3");

  
    if (showeditdanhmuc.classList.contains("collapse")) {
        showeditdanhmuc.classList.remove("collapse");  
        showeditdanhmuc.classList.add("show");        
    }
}

// Hàm gửi yêu cầu API với token trong header Authorization

//#endregion
//#region Thêm Danh Mục
window.Themdanhmuc = function (event) {
    event.preventDefault();
    const name = document.getElementById("danhmucthemname").value;
    const mota = document.getElementById("danhmucthemmota").value;
    const token = localStorage.getItem("token");

    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");

        return;
    }
    
  
    if (!name || !mota) {
        alert("Tên danh mục và mô tả không được để trống.");
        return;
    }
    showLoading()

    fetch(API_ENDPOINSADMIN.Danhmuc, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ten_danhmuc: name, 
            mota_danhmuc: mota 
        })
    })
    .then(response => {
     
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        showAlert("Thêm danh mục thành công!")
        danhmuc()
    })
        
  
    .catch(error => {
        console.error("Error:", error.message);
        showAlert("Đã có lỗi xảy ra khi thêm danh mục.","alert-danger");
    })
    // Gọi trong hàm finally để khi fetch thành công hay lỗi thì hàm hideLoading() đều được gọi
    .finally(() =>{
        hideLoading()
    })
};
//#endregion
//#region Sửa Danh Mục
window.editdanhmuc = function () {
  
    const ma = document.getElementById("madanhmuc2").value;
    const ten = document.getElementById("tendanhmuc2").value;
    const mota = document.getElementById("motadanhmuc2").value;
    const token = localStorage.getItem("token");

    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");

        return;
    }
    
  
    if (!ten || !mota) {
        alert("Tên danh mục và mô tả không được để trống.");
        return;
    }

    let edit = API_ENDPOINSADMIN.Danhmuc+`/id?id=${parseInt(ma)}`
    fetch(edit, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ten_danhmuc: ten, 
            mota_danhmuc: mota 
        })

       
    })
    .then(response => {
     
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  
    })
    .then(data => {
        showAlert("Sửa danh mục thành công!")

        danhmuc()
    })
        
  
    .catch(error => {
        console.error("Error:", error.message);
        showAlert("Đã có lỗi xảy ra khi sửa danh mục.","alert-danger");
    });

  }
//#endregion
//#region Xóa Danh Mục
window.xoadanhmuc= function(id,name){
    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");

        return;
    }
    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa danh mục ${name} không?`);
    if (!confirmDelete) {
        return; 
    }
      let xoadm = API_ENDPOINSADMIN.Danhmuc+`/id?id=${id}`
    fetch(xoadm, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
       
    })
    .then(response => {
     
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  
    })
    .then(data => {
        showAlert("Xoá danh mục thành công!")

        danhmuc()
    })
        
  
    .catch(error => {
        console.error("Error:", error.message);
        showAlert("Đã có lỗi xảy ra khi thêm danh mục.","alert-danger");
    });

  }

//#endregion
//#region  Hãng
Hangsx();
function Hangsx (){
    
fetch(API_ENDPOINSADMIN.Hangsx)
.then((p) => {
  if (!p.ok) {
    window.location.href = `http://127.0.0.1:5500/fruitables-1.0.0/404.html`;
    return;
  }

  return p.json();
})
.then((data) => {

  const danhmucsp = document.querySelector(".danhsachhangsx");
  const hangoption = document.getElementById("sanphamhangoptione");
  const hangoptio = document.getElementById("sanphamhangoption");
  const tenhangs = document.getElementById("tenhangs");
  danhmucsp.innerHTML="";
  hangoptio.innerHTML="";
  hangoption.innerHTML=""
  tenhangs.innerHTML=""
  data.forEach((p) => {
   
      danhmucsp.innerHTML+=` <tr class="">
          <th scope="row">${p.id_hangsx}</th>
          <td colspan="2">${p.ten_hangsx}</td>
          <td>${p.diachi_hangsx}</td>
          <td>${p.mota_hangsx}</td>
          <td> 
           <a href="#" class="btn btn-info mx-2" onclick="edithangsxshow(${p.id_hangsx}, '${p.ten_hangsx}', '${p.diachi_hangsx}', '${p.mota_hangsx}')">Sửa</a>
<a href="#" class="btn btn-danger" onclick="xoahang(${p.id_hangsx},'${p.ten_hangsx}')">Xoá</a> 

             </td>
        </tr>`;
        hangoption.innerHTML+=`<option value="${p.id_hangsx}">${p.ten_hangsx}</option>`
        hangoptio.innerHTML+=`<option value="${p.id_hangsx}">${p.ten_hangsx}</option>`
        tenhangs.innerHTML+=`<option value="${p.ten_hangsx}">${p.ten_hangsx}</option>`
    });

  });
}
//#endregion
//#region Thêm Hãng Sản Xuất
window.Themhangsx = function (event) {
    event.preventDefault();
    const name = document.getElementById("hangsxname").value;
    const diachi = document.getElementById("hangsxdiachi").value;
    const mota = document.getElementById("motahangsx").value;
    const token = localStorage.getItem("token");

    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");

        return;
    }
    
  
    if (!name || !mota || !diachi) {
        alert("Tên hãng, mô tả  và địa chỉ không được để trống.");
        return;
    }

 
    fetch(API_ENDPOINSADMIN.Hangsx, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ten_hangsx: name, 
            mota_hangsx: mota ,
            diachi_hangsx:diachi
          
        })
    })
    .then(response => {
     
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        showAlert("Thêm hãng sản xuất thành công!")
        Hangsx()
    })
        
  
    .catch(error => {
        console.error("Error:", error.message);
        showAlert("Đã có lỗi xảy ra khi thêm hãng.","alert-danger");
    });
};
//#endregion
//#region Sửa Hãng Sản Xuất

window.edithangsxshow = function(id, name, diachi,mt){
  
    document.getElementById("mahangsx2").value;
        document.getElementById("hangsxname2").value;
        document.getElementById("hangsxdiachi2").value;
        document.getElementById("motahangsx2").value; 
        document.getElementById("mahangsx2").value=id;
        document.getElementById("hangsxname2").value=name;
        document.getElementById("hangsxdiachi2").value=diachi;
        document.getElementById("motahangsx2").value=mt;
       var showeditdanhmuc = document.getElementById("hangsxnav3");
       if (showeditdanhmuc.classList.contains("collapse")) {
           showeditdanhmuc.classList.remove("collapse");  
           showeditdanhmuc.classList.add("show");        
       }
   }
   window.edithangsx = function () {
     
       const ma = document.getElementById("mahangsx2").value;
       const name = document.getElementById("hangsxname2").value;
       const diachi = document.getElementById("hangsxdiachi2").value;
       const mota = document.getElementById("motahangsx2").value;
       const token = localStorage.getItem("token");
   
       if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");

           return;
       }
       if (!name || !mota || !diachi) {
           alert("Tên hãng, địa chỉ và mô tả không được để trống.");
           return;
       }
       let edit = API_ENDPOINSADMIN.Hangsx+`/id?id=${parseInt(ma)}`
       fetch(edit, {
           method: "PUT",
           headers: {
               "Authorization": `Bearer ${token}`, 
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
               id_hangsx:ma,
               ten_hangsx: name, 
               diachi_hangsx:diachi,
               mota_hangsx: mota 
           })
       })
       .then(response => {
        
           if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
           }
           return response.json();  
       })
       .then(data => {
           showAlert("Sửa hãng sx thành công!")
           Hangsx()
       })
           
     
       .catch(error => {
           console.error("Error:", error.message);
           showAlert("Đã có lỗi xảy ra khi sửa danh mục.","alert-danger");
       });
   
     }
//#endregion
//#region Xóa Hãng Sản Xuất
window.xoahang= function(id,name){
    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }
    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa danh mục ${name} không?`);
    if (!confirmDelete) {
        return; 
    }
      let xoahang = API_ENDPOINSADMIN.Hangsx+`/id?id=${id}`
    fetch(xoahang, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
       
    })
    .then(response => {
     
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  
    })
    .then(data => {
        showAlert("Xoá hãng sx thành công!")
        Hangsx()
    })
    .catch(error => {
        console.error("Error:", error.message);
        showAlert("Đã có lỗi xảy ra khi thêm danh mục.","alert-danger");
    });
  }
//#endregion
//#region  SANPHAM
Sanpham();
function Sanpham (){
    const sp = API_ENDPOINSADMIN.Sanpham + `/danhsachsp1`;
fetch(sp)
.then((p) => {
  if (!p.ok) {
    window.location.href = `http://127.0.0.1:5500/fruitables-1.0.0/404.html`;
    return;
  }

  return p.json();
})
.then((data) => {

  const danhmucsp = document.querySelector(".danhsachsanpham");
  danhmucsp.innerHTML=""
  data.forEach((p) => {
   
    danhmucsp.innerHTML+=` 
    <tr class="" >
        <td  scope="row"><p class=" mt-5">${p.id_sanpham}</p></td>
        <td > <p style="margin-top:50px;width:100px;">${p.name_sanpham}</p></td>
        <td ><p style="margin-top:50px;">${p.tenDM}</p></td>
        <td > <p style="margin-top:50px;">${p.tenHang}</p></td>
  
<td class="motasp" >
  <p  style="margin-top:15px;max-height: 120px; width:200px; overflow-y: scroll; display: flex; align-items: flex-start; justify-content: center;">
    ${p.mota_sp} 
  </p>
</td>
        <td  ><p style="margin-top:45px;">${p.mausac}</p></td>
        <td > <p style="margin-top:45px;">${p.loai}</p></td>
        <td >   <p style="margin-top:45px;">${p.gia}</p></td>
        <td  ><p style="margin-top:45px;">${p.soluong}</p></td>
    
        <td class="px-1 mx-1">
        <img  src="/fruitables-1.0.0/img/${p.image1}" width="100px" height="140px" alt="">
        </td>
     <td class="px-1 mx-1">
        <img  src="/fruitables-1.0.0/img/${p.image2}" width="100px" height="140px" alt="">
        </td>
        <td> <p style="margin-top:15px;">${formatDate(p.ngay_add)} - ${formatDate(p.ngay_update)}</p></td>
        <td> 
          <a href="#" class="btn btn-info my-2" onclick="
          showeditsp(${p.id_sanpham}, '${p.name_sanpham}', '${p.mota_sp}', '${p.mausac}',
           '${p.loai}', ${removeFormatting(p.gia)}, ${p.soluong}, '${p.ngay_add}',
            '${p.ngay_update}', ${p.madm},${p.mahang},'${p.image1}','${p.image2}')">Sửa</a>
          <a href="#" class="btn btn-danger" onclick="xoasp(${p.id_sanpham},'${p.tenHang}')">Xoá</a>  
        </td>
    </tr>`;













  
    });

  });
}
window.Timkiemsp = function (page = 1) {
    const ma = document.querySelector("#idsps").value;
    const tensp = document.querySelector("#tensps").value;
    const tendm = document.querySelector("#tendanhmucs").value;
    const hangsx = document.querySelector("#tenhangs").value;
   
    console.log(ma+"="+tensp+"="+tendm+"="+hangsx);
    
  
    let apilocsp = API_ENDPOINSADMIN.Sanpham+`/GetOradmin?id=${ma}&keyword=${tensp}&tendm=${tendm}&hang=${hangsx}&page=${page}` ;
  
    fetch(apilocsp)
      .then((p) => {
        if (!p.ok) {
          window.location.href = `http://127.0.0.1:5500/fruitables-1.0.0/404.html`;
          return;
        }
        return p.json();
      })
      .then((data) => {
        const danhmucsp = document.querySelector(".danhsachsanpham");
  danhmucsp.innerHTML=""
  data.tongsoSP.forEach((p) => {
   
    danhmucsp.innerHTML+=` 
    <tr class="" >
        <td  scope="row"><p class=" mt-5">${p.id_sanpham}</p></td>
        <td > <p style="margin-top:40px;">${p.name_sanpham}</p></td>
        <td ><p style="margin-top:50px;">${p.tenDM}</p></td>
        <td > <p style="margin-top:50px;">${p.tenHang}</p></td>
  
<td class="motasp" >
  <p  style="margin-top:15px;max-height: 120px; width:260px;; overflow-y: scroll; display: flex; align-items: flex-start; justify-content: center;">
    ${p.mota_sp} Nội dung giữ chỗ cho ví dụ scrollspy. Nội dung này liên quan đến mục 1-1. Bạn có kiến ​​trúc đẹp nhất. Con dấu hộ chiếu, cô ấy là người quốc tế. Tốt, tươi mới, dữ dội, chúng tôi đã khóa chặt. Không bao giờ lên kế hoạch rằng một ngày nàoNội dung giữ chỗ cho ví dụ scrollspy. Nội dung này liên quan đến mục 1-1. Bạn có kiến ​​trúc đẹp nhất. Con dấu hộ chiếu, cô ấy là người quốc tế. Tốt, tươi mới, dữ dội, chúng tôi đã khóa chặt. Không bao giờ lên kế hoạch rằng một ngày nào
  </p>
</td>
              <td  ><p style="margin-top:45px;">${p.mausac}</p></td>
        <td > <p style="margin-top:45px;">${p.loai}</p></td>
        <td >   <p style="margin-top:45px;">${p.gia}</p></td>
        <td  ><p style="margin-top:45px;">${p.soluong}</p></td>
    
        <td class="px-1 mx-1"><img style="" src="/fruitables-1.0.0/img/${p.image1}" width="100px" height="140px" alt=""></td>
        <td class="px-1 mx-1"><img style="" src="/fruitables-1.0.0/img/${p.image2}" alt="" width="100px" height="140px"></td>
        <td> <p style="margin-top:15px;">${formatDate(p.ngay_add)} - ${formatDate(p.ngay_update)}</p></td>
        <td> 
          <a href="#" class="btn btn-info my-2" onclick="edithangsxshow(${p.id_hangsx}, '${p.ten_hangsx}', '${p.diachi_hangsx}', '${p.mota_hangsx}')">Sửa</a>
          <a href="#" class="btn btn-danger" onclick="xoahang(${p.id_hangsx},'${p.ten_hangsx}')">Xoá</a>  
        </td>
    </tr>`;
        });
  
      
      });
  };
//#endregion
//#region Thêm Sản Phẩm
window.Themsanphammoi = function(){
const name= document.getElementById("tenspp").value;
const danhmuc= document.getElementById("sanphamdmoption").value;
const hang= document.getElementById("sanphamhangoption").value;
const mota= document.getElementById("motaspp").value;
const mausac= document.getElementById("mauspp").value;
const loai= document.getElementById("loaispp").value;
const gia= document.getElementById("giaspp").value;
const soluong= document.getElementById("slspp").value;
const anh1= document.getElementById("anhspp1").value;
const anh2= document.getElementById("anhspp2").value;
const tenFile1 = anh1.split('\\').pop(); // Lấy tên file từ đường dẫn
const tenFile2 = anh2.split('\\').pop();
const dateadd= document.getElementById("dateaddspp1").value;
const dateedit= document.getElementById("dateaddspp2").value;

const  apipath = API_ENDPOINSADMIN.Sanpham
fetch(apipath,{
    method:"POST",
    headers:{
         "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"

    },
    body:JSON.stringify({
        name_sanpham:name,
        mota_sp:mota,
        mausac:mausac,
        loai:loai,
        gia:gia,
        soluong:soluong,
        image1:tenFile1,
        image2:tenFile2,
        ngay_add:dateadd,
        ngay_update:dateedit,
        id_danhmuc:danhmuc,
        id_hangsx:hang
    })

})
.then(response => {
        
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();  
})
.then(data => {
    showAlert("Thêm san phẩm thành công!")
    Sanpham()
})
    

.catch(error => {
    console.error("Error:", error.message);
    showAlert("Đã có lỗi xảy ra khi Thêm.","alert-danger");
});

}
//#endregion
//#region Sửa Sản Phẩm
window.showeditsp= function (id,name,mota,mau,loai,gia,sl,date1,date2,dm, hang,anh1,anh2){
        document.getElementById("masppe").value=id;
        document.getElementById("tensppe").value=name;
        document.getElementById("sanphamdmoptione").value=dm;
        document.getElementById("sanphamhangoptione").value=hang;
        document.getElementById("motasppe").value=mota;
        document.getElementById("mausppe").value=mau;
        document.getElementById("loaisppe").value=loai;
        document.getElementById("giasppe").value=gia;
        document.getElementById("slsppe").value=sl;
        document.getElementById("dateaddspp1e").value=formatDateForInput(date1);
        document.getElementById("dateaddspp2e").value=formatDateForInput(date2);

        // Hiển thị ảnh hiện tại
  const currentImage1Label = document.getElementById("currentImage1Name");
  const currentImage1Preview = document.getElementById("currentImage1Preview");
  const currentImage2Label = document.getElementById("currentImage2Name");
  const currentImage2Preview = document.getElementById("currentImage2Preview");

  currentImage1Label.textContent = anh1;
  currentImage1Preview.src = `/fruitables-1.0.0/img/${anh1}`; // Đường dẫn ảnh thật
  currentImage2Label.textContent = anh2;
  currentImage2Preview.src = `/fruitables-1.0.0/img/${anh2}`;
    var showeditsp = document.getElementById("sanphamnav3");
    if (showeditsp.classList.contains("collapse")) {
        showeditsp.classList.remove("collapse");  
        showeditsp.classList.add("show");        
    }
}
function formatDateForInput(dateString) {
    // Lấy phần "YYYY-MM-DD" từ chuỗi ngày giờ
    return dateString.split("T")[0];
}
function removeFormatting(value) {
    // Loại bỏ tất cả các dấu chấm hoặc dấu phẩy
    return parseInt(value.replace(/\./g, '').replace(/,/g, ''), 10);
}
window.Editsanpham = function() {
    const ma = document.getElementById("masppe").value;
    const name = document.getElementById("tensppe").value;
    const danhmuc = document.getElementById("sanphamdmoptione").value;
    const hang = document.getElementById("sanphamhangoptione").value;
    const mota = document.getElementById("motasppe").value;
    const mausac = document.getElementById("mausppe").value;
    const loai = document.getElementById("loaisppe").value;
    const gia = document.getElementById("giasppe").value;
    const soluong = document.getElementById("slsppe").value;
  
    const dateadd = document.getElementById("dateaddspp1e").value;
    const dateedit = document.getElementById("dateaddspp2e").value;
  
  
    const anh1Input = document.getElementById("anhspp1e");
    const anh2Input = document.getElementById("anhspp2e");

    let anh1 = "";
    let anh2 = "";


    if (anh1Input.files.length > 0) {
        anh1 = anh1Input.files[0].name; 
    } else {
       
        anh1 = document.getElementById("currentImage1Name").textContent;
    }

    if (anh2Input.files.length > 0) {
        anh2 = anh2Input.files[0].name; 
    } else {
        anh2 = document.getElementById("currentImage2Name").textContent;
    }
    console.log("Dữ liệu gửi đi:", {
        id_sanpham: ma,
        name_sanpham: name,
        mota_sp: mota,
        mausac: mausac,
        loai: loai,
        gia: gia,
        soluong: soluong,
        image1: anh1,
        image2: anh2,
        ngay_add: dateadd,
        ngay_update: dateedit,
        id_danhmuc: danhmuc,
        id_hangsx: hang
    });
   
    const apipath = API_ENDPOINSADMIN.Sanpham+`/id?id=${ma}`;
    fetch(apipath, {
        method: "PUT", 
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           
            name_sanpham: name,
            mota_sp: mota,
            mausac: mausac,
            loai: loai,
            gia: gia,
            soluong: soluong,
            image1: anh1,  
            image2: anh2,  
            ngay_add: dateadd,
            ngay_update: dateedit,
            id_danhmuc: danhmuc,
            id_hangsx: hang
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        showAlert("Cập nhật sản phẩm thành công!");
    
        Sanpham();
    })
    .catch(error => {
        console.error("Error:", error.message);
        showAlert("Đã có lỗi xảy ra khi cập nhật sản phẩm.","alert-danger");
    });
}
//#endregion
//#region Xóa Sản Phẩm
window.xoasp = function(id, name) {
    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }

    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa sản phẩm: ${name} không?`);
    if (!confirmDelete) {
        return;
    }

    const apipath = `${API_ENDPOINSADMIN.Sanpham}/id?id=${id}`;
    
    fetch(apipath, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        // Kiểm tra nếu phản hồi có mã trạng thái thành công
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || 'Lỗi không xác định');
            });
        }

        return response.json(); // Chuyển đổi phản hồi thành JSON
    })
    .then(data => {
        showAlert(data.message); // Hiển thị thông báo từ API
        Sanpham(); // Cập nhật lại danh sách sản phẩm
    })
    .catch(error => {
        console.error("Error:", error.message);
        showAlert(`Đã có lỗi xảy ra khi Xoá: ${error.message}`,"alert-danger");
    });
}
//#endregion
//#region TIN TUC
tintuc();
function tintuc(){
    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }
    const apilien =API_ENDPOINSADMIN.Tintuc;
    fetch(apilien)
    .then((p) => {
      if (!p.ok) {
        window.location.href = `http://127.0.0.1:5500/fruitables-1.0.0/404.html`;
        return;
      }
      return p.json();
    })
    .then((data) => {
        const danhmucsp = document.querySelector(".danhsachtintuc");
        danhmucsp.innerHTML=""
        data.forEach((p) => {
        
          danhmucsp.innerHTML+=` 
          <tr class="" >
              <td  scope="row"> <p style="margin-top: 50px; text-align:center" >${p.id}</p>  </td>
              <td > <p style="margin-top: 50px; text-align:center" >${p.tieude}</p></td>
              <td > <p style="margin-top: 50px; text-align:center;width:400px;" >${p.noidung}</p> </td>
              <td > <img src="/fruitables-1.0.0/img/${p.image}" width="250px" height="200px" alt=""> </td>
              <td > <p style="margin-top: 50px; text-align:center" >${p.ngaythem}</p> </td>
              <td>
                         <a href="#" class="btn btn-info mx-2" style="margin-top: 50px; text-align:center"
                          onclick="edittintucshow(${p.id}, '${p.tieude}', '${p.noidung}', '${p.image}','${p.ngaythem}')">Sửa</a>
                        <a href="#" class="btn btn-danger" style="margin-top: 50px; text-align:center" onclick="deletetintuc(${p.id},'${p.tieude}')">Xoá</a> 

              </td>
          </tr>`;
        })

    })
}
//#endregion
//#region them TIN TUC
window.themtintuc= function(){
    const title= document.getElementById("tieudett2").value;
    const noidung= document.getElementById("noiduungtt2").value;
    const image= document.getElementById("imagett2").value;
    const date1= document.getElementById("ngaythemtt2").value;
    const date = formatDate(date1)
    const tenFile1 = image.split('\\').pop(); 
    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }

    const apitt =API_ENDPOINSADMIN.Tintuc;
    fetch(apitt,{
        method:"POST",
        headers:{
             "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json"
    
        },
        body:JSON.stringify({
            tieude:title,
            noidung:noidung,
            image:tenFile1,
            ngaythem:date1
        })
    
    })
    .then(response => {
            
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  
    })
    .then(data => {
        showAlert("Thêm tin tức thành công!")
        tintuc()
    })

    .catch(error => {
        console.error("Error:", error.message);
        showAlert("Đã có lỗi xảy ra khi Thêm.","alert-danger");
    });
    
    }
//#endregion
//#region Edit TUN TUC 
window.edittintucshow = function (id, tieude, noidung, anh, date) {
    document.getElementById("matintuc3").value = id;
    document.getElementById("tieudett3").value = tieude;
    document.getElementById("noiduungtt3").value = noidung;
    document.getElementById("ngaythemtt3").value = formatDateForInput(date);

    // Hiển thị ảnh cũ
    const imageInput = document.getElementById("imagett3");
    const imagePreview = document.getElementById("oldImagePreview");
    imagePreview.src = "/fruitables-1.0.0/img/" + anh; // Đường dẫn ảnh cũ
    imageInput.setAttribute("data-old-image", anh); // Lưu ảnh cũ vào thuộc tính

    const showeditsp = document.getElementById("tintucnav3");
    if (showeditsp.classList.contains("collapse")) {
        showeditsp.classList.remove("collapse");
        showeditsp.classList.add("show");
    }
};
window.edittintuc = function () {
    const id = document.getElementById("matintuc3").value; // Lấy ID từ input
    const title = document.getElementById("tieudett3").value.trim(); // Tiêu đề
    const noidung = document.getElementById("noiduungtt3").value.trim(); // Nội dung
    const newImage = document.getElementById("imagett3").value; // Ảnh mới (nếu có)
    const oldImage = document.getElementById("imagett3").getAttribute("data-old-image"); // Ảnh cũ
    const date1 = document.getElementById("ngaythemtt3").value; // Ngày thêm
    const token = localStorage.getItem("token"); // Token từ localStorage

    // Chọn ảnh sử dụng
    const image = newImage ? newImage.split('\\').pop() : oldImage;

    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }

    if (!id || !title || !noidung || !date1) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    // API URL
    const apitt = `https://localhost:7231/api/Tintuc/${id}`;

    // Gửi dữ liệu PUT
    fetch(apitt, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tieude: title,
            noidung: noidung,
            image: image,
            ngaythem: date1
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    console.error("Phản hồi lỗi từ API:", err);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            showAlert("Cập nhật tin tức thành công!");
            tintuc(); // Hàm cập nhật danh sách tin tức
        })
        .catch(error => {
            console.error("Error:", error.message);
            showAlert(`Đã có lỗi xảy ra khi cập nhật: ${error.message}`,"alert-danger");
        });
};
//#endregion
//#region DELETE TINTUC
window.deletetintuc = function(id,tieude){
    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }
    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa Tin tức${tieude} không?`);
    if (!confirmDelete) {
        return; 
    }

      let xoahang = API_ENDPOINSADMIN.Tintuc+`/${id}`
    fetch(xoahang, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
       
    })
    .then(response => {
     
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  
    })
    .then(data => {
        showAlert("Xoá Tin tức thành công!")
       tintuc()
    })
    .catch(error => {
        console.error("Error:", error.message);
        showAlert("Đã có lỗi xảy ra khi xoá.","alert-danger");
    });
  
}
//#endregion
//#region Lienhe
lienhe();
function lienhe(){
    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }
    const apilien =API_ENDPOINSADMIN.Lienhe;
    fetch(apilien)
    .then((p) => {
      if (!p.ok) {
        window.location.href = `http://127.0.0.1:5500/fruitables-1.0.0/404.html`;
        return;
      }
      return p.json();
    })
    .then((data) => {

        const danhmucsp = document.querySelector(".danhsachlienhe");
        danhmucsp.innerHTML=""
        data.forEach((p) => {
        var ngaythem =p.ngaythem.split('T00:00:00')
          danhmucsp.innerHTML+=` 
          <tr class="" >
              <td  scope="row">${p.id}</td>
              <td > ${p.name}</td>
              <td > ${p.email}</td>
              <td ><p style="width:500px;height:auto"> ${p.noidung}</p></td>
              <td > ${p.sdt}</td>  
              <td > ${ngaythem[0]}</td>
              <td>
              
                <a href="#" class="btn btn-danger" style=" text-align:center" onclick="deletelienhe(${p.id},'${p.name}')">Xoá</a> 
              </td>
          </tr>`;
        })

    })
}
window.deletelienhe= function(id,name){
    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }
    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa Tin tức${name} không?`);
    if (!confirmDelete) {
        return; 
    }

      let xoahang = API_ENDPOINSADMIN.Lienhe+`/${id}`
    fetch(xoahang, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
       
    })
    .then(response => {
     
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  
    })
    .then(data => {
        showAlert("Xoá Liên hệ thành công!")
     lienhe()
    })
    .catch(error => {
        console.error("Error:", error.message);
        showAlert("Đã có lỗi xảy ra khi xoá.","alert-danger");
    });
  
}
//#endregion
//#region Thêm Thông Tin Website
ttwebsite();
function ttwebsite(){
    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }
    const apilien =API_ENDPOINSADMIN.Thongtinweb;
    fetch(apilien)
    .then((p) => {
      if (!p.ok) {
        window.location.href = `http://127.0.0.1:5500/fruitables-1.0.0/404.html`;
        return;
      }
      return p.json();
    })
    .then((data) => {
        const danhmucsp = document.querySelector(".danhsachttweb");
        danhmucsp.innerHTML=""
        data.forEach((p) => {
        
          danhmucsp.innerHTML+=` 
          <tr class="" >
              <td  scope="row" >${p.id}</p>  </td>
              <td  >${p.email}</p></td>
              <td  >${p.diachi}</p> </td>
              <td  >${p.sdt}</p> </td>
              <td  >${p.tencongty}</p> </td>          
              <td  >${p.mota}</p> </td>
             
          </tr>`;
        })

    })
}
window.themthongtin= function(){
    const email= document.getElementById("emaildn").value;
    const diachi= document.getElementById("diachidn").value;
    const sdt= document.getElementById("sdtdn").value;
    const tencty= document.getElementById("namedn").value;
    const mota= document.getElementById("motadn").value;
    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }
    console.log({
        email: email,
        diachi: diachi,
        sdt: sdt,
        tencongty: tencty,
        mota: mota,
   
    });
    
    const apitt =API_ENDPOINSADMIN.Thongtinweb;
    fetch(apitt,{
        method:"POST",
        headers:{
             "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json"
    
        },
        body:JSON.stringify({
            email:email,
            diachi:diachi,
            sdt:sdt,
            tencongty:tencty,
            mota:mota,
        })
    
    })
    .then(response => {
            
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  
    })
    .then(data => {
        showAlert("Thêm Cập nhật thành công!")
        ttwebsite()
    })

    .catch(error => {
        console.error("Error:", error.message);
        showAlert("Đã có lỗi xảy ra khi Cập nhật","alert-danger");
    });
    
    
}
//#endregion
//#region  banner Index
bannerIndex();
function bannerIndex(){
    const apiget = API_ENDPOINSADMIN.BannerIndex;

    fetch(apiget)
    .then(p=>{
        if(!p.ok){
            window.location.href= `http://127.0.0.1:5500/fruitables-1.0.0/404.html`;
            return;
        }
        return p.json();
    })
    .then(data=>{
   const listdata = document.querySelector(".danhsachbannerIndex");
   listdata.innerHTML='';
        data.forEach(p => {
            listdata.innerHTML+=`
        <tr>
            <th scope="col"> <p style="margin-top: 50px; ">${p.id}</p> </th>
            <td > <p style="margin-top: 50px; ">${p.name}</p> </td>
            <td > <img src="/fruitables-1.0.0/img/${p.image}" width="350px" height=200px"> </td>
            <td > 
            <a class=" btn btn-danger" style="margin-top: 45px;  href="" onclick="xoabannerindex(${p.id},'${p.name}')">Xoá</a>
            </td>
          </tr>`
        });
    })
}
 window.ThemmoibannerIndex= function(){
    let danhmuc=  document.getElementById("sanphamdmoption2").value;
    let image = document.querySelector("#imagebannerindex").value;
let anh = image.split('\\').pop()
  
const token = localStorage.getItem("token");
if (!token) {
    showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
    return;
}

const apitt =API_ENDPOINSADMIN.BannerIndex;
fetch(apitt,{
    method:"POST",
    headers:{
         "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"

    },
    body:JSON.stringify({
        name:danhmuc,
        image:anh
 
    })

})
.then(response => {
        
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();  
})
.then(data => {
    showAlert("Thêm bannerindex thành công!")
    bannerIndex()
})

.catch(error => {
    console.error("Error:", error.message);
    showAlert("Đã có lỗi xảy ra khi Thêm.","alert-danger");
});

}




window.xoabannerindex= function(id,name){
  const apidelete = API_ENDPOINSADMIN.BannerIndex+`/id?id=${id}`
  const token = localStorage.getItem("token");
  if (!token) {
    showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
    return;
  }
 if(!confirm("Bạn có muốn xoá "+ name+" này không!")){
    return;
 }
fetch(apidelete,{
    method: "DELETE",
    headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json"
    },
})  .then(response => {
     
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();  
})
.then(data => {
    showAlert("Xoá thành công!")  
 bannerIndex();
})
.catch(error => {
    console.error("Error:", error.message);
    showAlert("Đã có lỗi xảy ra khi xoá.","alert-danger");
});
}
//#endregion

//#region SANPHAM QUANG BA
sanphamquangba();
function sanphamquangba(){
    const apiget = API_ENDPOINSADMIN.SanphamQuangBa;

    fetch(apiget)
    .then(p=>{
        if(!p.ok){
            window.location.href= `http://127.0.0.1:5500/fruitables-1.0.0/404.html`;
            return;
        }
        return p.json();
    })
    .then(data=>{
   const listdata = document.querySelector(".sanphamquangba");
   listdata.innerHTML='';
        data.forEach(p => {
            listdata.innerHTML+=`
        <tr>
            <th scope="col"> <p style="margin-top: 150px; ">${p.id}</p> </th>
            <td > <p style="margin-top: 150px; ">${p.title1}</p> </td>
            <td > <p style="margin-top: 150px; ">${p.title2}</p> </td>
            <td > <img src="/fruitables-1.0.0/img/${p.image}" width="300px" height=300px"> </td>
            <td > <p style="margin-top: 50px; max-width:500px;">${p.mota}       </p> </td>
          
           
          </tr>`
        });
    })
}
 window.Themmoisanphamquangba= function(){
    let td1=  document.getElementById("tieude1").value;
    let td2=  document.getElementById("tieude2").value;
    let mota=  document.getElementById("motasanphamquangba").value;
    let image = document.querySelector("#imagespquangba").value;
let anh = image.split('\\').pop()
  
const token = localStorage.getItem("token");
if (!token) {
    showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
    return;
}

const apitt =API_ENDPOINSADMIN.SanphamQuangBa;
fetch(apitt,{
    method:"POST",
    headers:{
         "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"

    },
    body:JSON.stringify({
        title1:td1,
        title2:td2,
        image:anh,
        mota:mota
 
    })

})
.then(response => {
        
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();  
})
.then(data => {
    showAlert("Thêm sản phẩm quảng bá thành công!")
    sanphamquangba()
})

.catch(error => {
    console.error("Error:", error.message);
    showAlert("Đã có lỗi xảy ra khi thêm.","alert-danger");
});

}
//#endregion

//#region Bannerthree
bannerthree();
function bannerthree(){
    const apiget = API_ENDPOINSADMIN.BannerThree;
    fetch(apiget)
    .then(p=>{
        if(!p.ok){
            window.location.href= `http://127.0.0.1:5500/fruitables-1.0.0/404.html`;
            return;
        }
        return p.json();
    })
    .then(data=>{
   const listdata = document.querySelector(".danhsachbannerthree");
   listdata.innerHTML='';
        data.forEach(p => {
            listdata.innerHTML+=`
        <tr>
            <th scope="col"> <p style="margin-top: 150px; ">${p.id}</p> </th>
            <td > <p style="margin-top: 150px; ">${p.title}</p> </td>
            <td > <img src="/fruitables-1.0.0/img/${p.image}" width="450px" height=300px"> </td>
            <td > <p style="margin-top: 150px; max-width:500px;">${p.mota}</p> </td>
          <td>
         <a class=" btn btn-danger" style="margin-top: 145px;  href="" onclick="xoabannerthree(${p.id},'${p.title}')">Xoá</a>

          </td>
           
          </tr>`
        });
    })
}
window.Themmoibannerthree= function(){
    let td=  document.getElementById("tieudebannerthree").value;
    let mota=  document.getElementById("motabannerthree").value;
    let image = document.querySelector("#imagebannerthree").value;
let anh = image.split('\\').pop()
  
const token = localStorage.getItem("token");
if (!token) {
    showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
    return;
}

const apitt =API_ENDPOINSADMIN.BannerThree;
fetch(apitt,{
    method:"POST",
    headers:{
         "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"

    },
    body:JSON.stringify({
        title:td,
        image:anh,
        mota:mota
        
 
    })

})
.then(response => {
        
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();  
})
.then(data => {
    showAlert("Thêm sản phẩm quảng bá thành công!")
    bannerthree()
})

.catch(error => {
    console.error("Error:", error.message);
    showAlert("Đã có lỗi xảy ra khi thêm.","alert-danger");
});

}

window.xoabannerthree = function (id, name) {
    
        const apidelete = API_ENDPOINSADMIN.BannerThree+`/id?id=${id}`
        const token = localStorage.getItem("token");
        if (!token) {
            showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
            return;
        }
       if(!confirm("Bạn có muốn xoá "+ name+" này không!")){
          return;
       }
       fetch(apidelete, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
    .then(response => {
        console.log("HTTP Status:", response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.status === 204) {
            showAlert("Xoá banner thành công!");
            bannerthree();
            return; // Không xử lý JSON nếu response là 204
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            console.log("Response Data:", data);
            showAlert(data.message || "Xoá banner thành công!");
            bannerthree();
        }
    })
    .catch(error => {
        console.error("Error:", error.message);
        showAlert("Đã có lỗi xảy ra khi xoá.","alert-danger");
    });
}    
//#endregion

//#region  THONG KE 
thongkett();
function thongkett(){
    const api = API_ENDPOINSADMIN.Thongke;

 document.getElementById("sosanpham");
 document.getElementById("sodonhang");
 fetch(api)
 .then(p=>{
    if(!p.ok){
        window.location.href="/fruitables-1.0.0/404.html"
    }
    return p.json()
 })
 .then(data=>{
    document.getElementById("soluonglienhe").textContent=data.lienhe;
    document.getElementById("sosanpham").innerText=data.soSP;
    document.getElementById("sodonhang").innerText=data.tong;
    document.getElementById("sodonhanghuy").innerText=data.huy;
    document.getElementById("tongsosanpham").innerText=data.tongsanpham;
    document.getElementById("soluotdanhgia").innerText=data.danhgia;
    document.getElementById("sanphamdanhan").innerText=data.banra;
    document.getElementById("donhangchoxuly").innerText=data.xuly;
    document.getElementById("tongdoanhthu").innerText=data.doanhthu+' VNĐ';
    document.getElementById("doanhthuthang").innerText=data.donhthuthang+' VNĐ';
 });
const taikhoan = API_ENDPOINSADMIN.Taikhoan
fetch(taikhoan)
.then(p=>{
    if(!p.ok){
        window.location.href="/fruitables-1.0.0/404.html"
    }
    return p.json()
 })
 .then(data=>{
    document.getElementById("taikhoankhachhang").textContent=data.souser;
 });



}
//#endregion

//#region Khachhang
khachhang()
function khachhang(){
    const taikhoan = API_ENDPOINSADMIN.Taikhoan
fetch(taikhoan)
.then(p=>{
    if(!p.ok){
        window.location.href="/fruitables-1.0.0/404.html"
    }
    return p.json()
 })
 .then((data) => {

    const user = document.querySelector(".danhsachtaikhoan");
    user.innerHTML=""
    data.userRoles.forEach((p) => {
     
        user.innerHTML+=` 
      <tr class="" >
          <td  scope="row"><p >${p.email}</p></td>
          <td > <p ">${p.userName}</p></td>
          <td ><p ">${p.sdt}</p></td>
          <td > <p ">${p.diachi}</p></td> 
           <td ><p ">${p.ngay_sinh}</p></td>
        <td>
        <button  class="btn btn-danger" onclick ="xoataikhoan('${p.email}','${p.userName}')">Xoá</button>
        </td>
      </tr>`;
    
      });
  
    });
  }
  window.xoataikhoan = function (email, name) {
    
    const apidelete = API_ENDPOINSADMIN.Taikhoan+`/email?email=${email}`
    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }
   if(!confirm("Bạn có muốn xoá "+ name+" này không!")){
      return;
   }
   fetch(apidelete, {
    method: "DELETE",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    },
})
.then(response => {
    console.log("HTTP Status:", response.status);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    if (response.status === 204) {
        showAlert("Xoá Tài khoản thành công!");
        bannerthree();
        return; // Không xử lý JSON nếu response là 204
    }
    return response.json();
})
.then(data => {
    if (data) {
        console.log("Response Data:", data);
        showAlert(data.message || "Xoá tài khoản thành công!");
     khachhang();
    }
})
.catch(error => {
    console.error("Error:", error.message);
    showAlert("Đã có lỗi xảy ra khi xoá.","alert-danger");
});
} 
//#endregion
//#region Donhang
donhang()
function donhang() {
    const api = API_ENDPOINSADMIN.Taikhoan + `/ALL`;
    fetch(api)
        .then(p => {
            if (!p.ok) {
                window.location.href = "/fruitables-1.0.0/404.html";
            }
            return p.json();
        })
        .then((data) => {
            const user = document.querySelector(".danhsachdonhang");
            user.innerHTML = "";
            data.forEach((p) => {
                var trangthai = "";
                let bien = p.trangthai;
                switch (bien) {
                    case 1:
                        trangthai = "Đang xử lý";
                        break;
                    case 2:
                        trangthai = "Đang trung chuyển";
                        break;
                    case 3:
                        trangthai = "Đang giao";
                        break;
                    case 4:
                        trangthai = "Đã giao";
                        break;
                    case 5:
                        trangthai = "Đã huỷ";
                        break;
                    default:
                        trangthai = "Error";
                }

                var thanhtoan2 = "";
                let bien2 = p.type_thanhtoan;
                switch (bien2) {
                    case 1:
                        thanhtoan2 = "Thanh toán khi nhận hàng";
                        break;
                    case 2:
                        thanhtoan2 = "Thanh toán ngay";
                        break;
                    default:
                        thanhtoan2 = "Error";
                }

                // Nếu đơn hàng đang xử lý, hiển thị thêm các nút
                let buttons = "";
                if (bien === 1) {  
                    buttons = `
                        <button class="btn btn-warning" onclick="xacnhanguihang(${p.id_donhang})">Xác nhận gửi</button>
                        <button class="btn btn-danger" onclick="xacnhanhuy(${p.id_donhang})">Huỷ đơn</button>
                     
                    `;
                }

                // Thêm dữ liệu vào bảng
                user.innerHTML += `
                    <tr class="">
                        <td scope="row"><p>${p.id_donhang}</p></td>
                        <td><p>${p.email}</p></td>
                        <td><p>${p.username}</p></td>
                        <td><p>${p.ngay_dat}</p></td>
                        <td><p>${p.nguoinhan}</p></td>
                        <td><p>${p.diachi}</p></td>
                        <td><p>${p.sdt}</p></td>
                        <td><p>${trangthai}</p></td>
                        <td><p>${thanhtoan2}</p></td>
                        <td><p>${p.soluong}</p></td>
                        <td><p>${p.gia}</p></td>
                        <td><p>   <button class="btn btn-info" onclick="showModalDetails(${p.id_donhang})">Xem thêm</button></p></td>
                        <td>${buttons}</td>
                    </tr>`;
            });
        });
}

// Hàm hiển thị modal chi tiết sản phẩm
window.showModalDetails=function(id_donhang) {
    const api = API_ENDPOINSADMIN.Taikhoan + `/Details?id_donhang=${id_donhang}`;
    fetch(api)
        .then(p => {
            if (!p.ok) {
                showAlert("Có lỗi khi tải dữ liệu chi tiết!","alert-danger");
                return;
            }
            return p.json();
        })
        .then(data => {
            const modalItemDetails = document.getElementById('modalItemDetails');
            const modalTotalQuantity = document.getElementById('modalTotalQuantity');
            const modalTotalPrice = document.getElementById('modalTotalPrice');

            // Xóa các item cũ trong modal
            modalItemDetails.innerHTML = "";

            let totalQuantity = 0;
            let totalPrice = 0;

            // Thêm từng item vào modal
            data.items.forEach(item => {
                totalQuantity += item.soluong;
                totalPrice += item.soluong * item.gia;

                modalItemDetails.innerHTML += `
                    <tr>
                        <td>${item.id_sanpham}</td>
                        <td>${item.sanpham}</td>
                        <td>${item.soluong}</td>
                        <td>${item.gia}</td>
                        <td>${item.soluong * item.gia}</td>
                    </tr>
                `;
            });

            // Cập nhật tổng số lượng và tổng giá
            modalTotalQuantity.textContent = totalQuantity;
            modalTotalPrice.textContent = totalPrice.toLocaleString();  // Định dạng giá

            // Hiển thị modal
            $('#modalDetail').modal('show');
        });
}


// Hàm xác nhận gửi hàng
// Hàm xác nhận gửi hàng
window.xacnhanguihang = function(id) {
    var apixacnhan = API_ENDPOINSADMIN.Donhang + `/Xacnhan?id=${id}`;
    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }
    fetch(apixacnhan, {
        method: 'PUT',
        headers: {
                     "Authorization": `Bearer ${token}`, 
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Có lỗi xảy ra khi xác nhận gửi hàng!');
        }
        // Sau khi hoàn tất yêu cầu, gọi lại hàm Donhang để cập nhật
        donhang();
    })
    .catch(error => {
        console.error("Lỗi xác nhận gửi hàng:", error);
        showAlert("Có lỗi xảy ra khi xác nhận gửi hàng.","alsert-danger");
    });
}

// Hàm hủy đơn hàng
window.xacnhanhuy = function(id) {
    var apixacnhan = API_ENDPOINSADMIN.Donhang + `/HuyAdmin?id=${id}`;

    // Gửi yêu cầu PUT để hủy đơn hàng
    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
        return;
    }
    fetch(apixacnhan, {
        method: 'PUT',
        headers: {
                     "Authorization": `Bearer ${token}`, 
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Có lỗi xảy ra khi hủy đơn hàng!');
        }
        // Sau khi hoàn tất yêu cầu, gọi lại hàm Donhang để cập nhật
        donhang();
    })
    .catch(error => {
        console.error("Lỗi hủy đơn hàng:", error);
        showAlert("Có lỗi xảy ra khi hủy đơn hàng.","alert-danger");
    });
}


  window.Timkiemdonhang= function(){
    var usser = document.getElementById("emailnguoidungdonhang").value;
const api= API_ENDPOINSADMIN.Taikhoan+`/DonhangEmail?name=${usser}`;
fetch(api)
.then(p=>{
    if(!p.ok){
        window.location.href="/fruitables-1.0.0/404.html"
    }
    return p.json()
 })
 .then((data) => {

    const user = document.querySelector(".danhsachdonhang");
    user.innerHTML=""

    if (data.mesage == 1) {
        showAlert("Không tìm thấy đơn hàng nào cho người dùng này!");
        donhang() // Dừng hàm nếu không có dữ liệu
    }


    data.forEach((p) => {
     var trangthai =""
     let bien =p.trangthai;
     switch(bien){
        case 1:
            trangthai="Đang xử lý";
            break;
        case 2:
            trangthai="Đang trung chuyển";
            break;
        case 3:
            trangthai="Đang giao";
            break; 
        case 4:
            trangthai="Đã giao";
            break;
        case 5:
            trangthai="Đã huỷ";
            break;
        default:
        trangthai="Erorr";
     };
     var thanhtoan2 =""
     let bien2 =p.type_thanhtoan;
     switch(bien2){
        case 1:
            thanhtoan2="Thanh toán khi nhận hàng";
            break;
        case 2:
            thanhtoan2="Thanh toán ngay";
            break;
            default:
                thanhtoan2="Erorr";
     }
        user.innerHTML+=` 
      <tr class="" >
          <td  scope="row"><p >${p.id_donhang}</p></td>
          <td > <p ">${p.email}</p></td>
          <td > <p ">${p.username}</p></td>
          <td ><p ">${p.ngay_dat}</p></td>
          <td > <p ">${p.nguoinhan}</p></td> 
          <td > <p ">${p.diachi}</p></td> 
          <td > <p ">${p.sdt}</p></td> 
           <td ><p ">${trangthai}</p></td>
           <td ><p ">${thanhtoan2}</p></td>
        <td>
        <button class="btn btn-warning" onclick ="xacnhanguihang('${p.email}','${p.userName}')">Xác nhận gửi</button>
        </td>
      </tr>`;
    
      });
  
    });
  
  }
//#endregion

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
function showAlert(message, type = 'alert-primary', duration = 5000) {

    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', type, 'alert-dismissible', 'fade', 'show', 'position-fixed', 'bottom-0', 'end-0', 'm-3', 'mb-5');
    alertDiv.style.marginBottom = "990px"; // Cách lề dưới 150px
    
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.classList.remove('show');
      alertDiv.classList.add('fade');
      setTimeout(() => {
        alertDiv.remove();
      }, 500); 
    }, duration);
  }
  
//   =========================================================== BIEUDO
//#region Bieudo
 var sao1=0;
 var sao2=0;
 var sao3=0;
 var sao4=0;
 var sao5=0;
 var tongdonh=0;
 var xuly =0;
 var trungchuyen=0;
 var danhan=0;
 var dahuy=0;
 var cotronggio=0;
 var allcustomerbuy=0;
 var khachnew=0;
 var khachold=0;
 function bieuudo (){
 let apibieudo=  API_ENDPOINSADMIN.Bieudo;

    fetch(apibieudo)

  .then(p=>{
   
        if(!p.ok){
            window.location.href="/fruitables-1.0.0/404.html"
        }
        return p.json()
    }
 )
 .then(data=>{
    sao1=data.onesao;
    sao2=data.twosao;
    sao3=data.threesao;
    sao4=data.foursao;
    sao5=data.fivesao;

    tongdonh=data.tongdon;
    xuly =data.xuly;
    trungchuyen=data.trungchuyen;
    danhan=data.danhan;
    dahuy=data.dahuy;
    cotronggio=data.giocohang

    allcustomerbuy=data.khachfirts;
    khachnew=data.khach1don;
    khachold=data.khachndon;   
 
  
    //#region thognkedanhgia
    let myChart3 = document.getElementById('myChart3').getContext('2d');
// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = 'green';

let massPopChart3= new Chart(myChart3, {
  type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels:['5 sao', '4 sao', '3 sao', '2 sao', '1 sao'],
    datasets:[{
      label:'Đánh giá',
      data:[
        sao5,
        sao4,
        sao3,
        sao2,
        sao1
        
      ],
      //backgroundColor:'green',
      backgroundColor:[
        'rgba(121, 230, 59, 0.6)',

    
      ],
      borderWidth:3,
      borderColor:'#777',
      hoverBorderWidth:1,
      hoverBorderColor:'#000'
    }]
  },
  options: {
responsive: true,
maintainAspectRatio: false,
title: {
display: true,
text: 'Thống kê đánh giá các sản phẩm',
fontSize: 30
},
legend: {
display: true,
position: 'right',
labels: {
fontColor: '#000'
}
},
layout: {
padding: {
left: 50,
right: 0,
bottom: 0,
top: 0
}
},
tooltips: {
enabled: true
}
}

}); 
//#endregion
 //#region thong ke khach hang
 let myChart2 = document.getElementById('myChart2').getContext('2d');
 // Global Options
 Chart.defaults.global.defaultFontFamily = 'Lato';
 Chart.defaults.global.defaultFontSize = 30;
 Chart.defaults.global.defaultFontColor = '#776';
 
 let massPopChart2 = new Chart(myChart2, {
   type:'pie', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
   data:{
     labels:['Tổng khách mua', 'Khách mới', 'Khách mua lại' ],
     datasets:[{
       label:'Khách hàng',
       data:[
        allcustomerbuy,
         khachnew,
         khachold
        
      
       ],
    
     //   backgroundColor:'green',
       backgroundColor:[                
         'rgba(23, 240, 7, 0.6)',             
         'rgba(241, 95, 239, 0.6)',
         'rgba(7, 229, 245, 0.6)',            
         'rgba(177, 225, 20, 0.6)'
       ],
       borderWidth:1,
       borderColor:'#777',
       hoverBorderWidth:3,
       hoverBorderColor:'#000'
     }]
   },
   options: {
 responsive: true,
 maintainAspectRatio: false,
 title: {
 display: true,
 text: 'Thống kê doanh thu của cửa hàng',
 fontSize: 30
 },
 legend: {
 display: true,
 position: 'right',
 labels: {
 fontColor: '#000'
 }
 },
 layout: {
 padding: {
 left: 50,
 right: 0,
 bottom: 0,
 top: 0
 }
 },
 tooltips: {
 enabled: true
 }
 }
 
 });
 

 //#endregion

//#region thongke don hang

let myChart = document.getElementById('myChart').getContext('2d');
// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontColor = '#777';

let massPopChart = new Chart(myChart, {
  type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels:['Tổng số', 'Xử lý', 'Trung chuyển', 'Đã nhận', 'Đã huỷ', 'Giỏ hàng'],
    datasets:[{
      label:'Đơn hàng',
      data:[
        tongdonh,
        xuly,
        trungchuyen,
        danhan,
        dahuy,
        cotronggio
      ],
      //backgroundColor:'green',
      backgroundColor:[
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ],
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:3,
      hoverBorderColor:'#000'
    }]
  },
  options:{
    title:{
      display:true,
      text:'Thống kê doanh thu của cửa hàng',
      fontSize:30
    },
    legend:{
      display:true,
      position:'right',
      labels:{
        fontColor:'#000'
      }
    },
    layout:{
      padding:{
        left:50,
        right:0,
        bottom:0,
        top:0
      }
    },
    tooltips:{
      enabled:true
    }
  }
});
//#endregion

})
 .catch(error => {
    console.error("Lỗi :", error);
    showAlert("Có lỗi xảy ra .","alert-danger");
});
 }

bieuudo()

//#endregion

