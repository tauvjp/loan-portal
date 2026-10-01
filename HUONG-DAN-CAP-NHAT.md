# Cập nhật giao diện mới cho vayonline.io.vn

Gói này đã được tạo sẵn để dùng với GitHub Pages của repository `tauvjp/loan-portal`. Bạn không cần chạy lệnh hay cài phần mềm để đưa web lên.

## Các bước trên GitHub

1. Giải nén `vayonline-github-update.zip` trên máy tính.
2. Mở https://github.com/tauvjp/loan-portal và đăng nhập tài khoản có quyền sửa repository.
3. Chọn nhánh `main`, bấm **Add file → Upload files**.
4. Kéo toàn bộ các file và thư mục vừa giải nén vào vùng tải lên. Các file như `index.html`, `CNAME`, thư mục `assets` và `images` phải nằm ngay ở thư mục gốc của repository. Không tải riêng file ZIP và không lồng chúng trong một thư mục mới.
5. Nhập nội dung cập nhật, ví dụ **Cập nhật giao diện VayOnline**, rồi bấm **Commit changes**. Nếu GitHub yêu cầu tạo nhánh và pull request, hoàn tất pull request để đưa thay đổi vào nhánh xuất bản.
6. Mở tab **Actions** và chờ tác vụ GitHub Pages mới nhất thành công. Sau đó mở https://vayonline.io.vn và tải lại trang bằng **Ctrl + F5**.
7. Thử tăng/giảm số tiền, mở **Xem thông tin**, menu điện thoại và kiểm tra các nút đăng ký của ba dịch vụ.

Nếu trang chưa đổi sau khi tác vụ đã thành công, kiểm tra **Settings → Pages**: nguồn xuất bản phải trỏ tới nhánh chứa các file mới và thư mục gốc `/(root)`. Không thay nguồn xuất bản nếu cấu hình hiện tại đã đúng.

## Những phần đã chuẩn bị

- Giao diện đã duyệt, ảnh minh họa và logo của ba dịch vụ.
- Moneyveo, Vayvnd và MoneyCat với đúng link affiliate đã cung cấp.
- Nút điều chỉnh số tiền, thông tin dịch vụ, câu hỏi thường gặp và menu điện thoại.
- HTML có sẵn nội dung để người đọc và công cụ tìm kiếm truy cập ngay.
- Google Analytics và thẻ xác minh Google Search Console hiện tại.
- Tên miền `vayonline.io.vn` trong file `CNAME`; không cần thay DNS khi tiếp tục dùng GitHub Pages này.

Trang chủ mới không thu họ tên/số điện thoại. Trang `admin.html` cũ vẫn có thể đọc dữ liệu cũ đã lưu trong cùng trình duyệt, nhưng không có hồ sơ mới từ giao diện này.

## Giữ bản cũ và chỉnh sửa về sau

GitHub lưu lịch sử các lần cập nhật. Phiên bản trước khi thay giao diện là commit `7adb2bb89b9af562b71ebc65b83ca31c5736bbda`. Có thể dựa vào commit này để khôi phục nếu cần.

Gói tải lên cũng có mã nguồn trong `src/`. Người sửa code về sau có thể làm theo `DEPLOYMENT.md` để tạo lại các file xuất bản. Các file quản trị và quảng cáo cũ không nằm trong gói cập nhật sẽ tiếp tục tồn tại trên repository.
