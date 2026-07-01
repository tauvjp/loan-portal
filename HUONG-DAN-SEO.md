# 📊 HƯỚNG DẪN SETUP SEO CHO VAYONLINE.IO.VN

## Phần 1: Google Analytics (GA4)

### Bước 1: Tạo tài khoản Google Analytics
1. Vào: https://analytics.google.com/
2. Đăng nhập bằng Gmail của anh (dinhvucuong88@gmail.com)
3. Nếu lần đầu dùng GA, click **"Start measuring"**
4. Nếu đã có account, click **"Admin"** (bánh răng ở góc dưới bên trái)

### Bước 2: Tạo Property mới
1. Trong màn hình Admin:
   - Cột giữa "Property" → Click **"Create Property"**
2. Điền thông tin:
   - **Property name**: `Vay Online` hoặc `vayonline.io.vn`
   - **Reporting time zone**: `(GMT+07:00) Bangkok` hoặc `Vietnam`
   - **Currency**: `Vietnamese Dong (₫)`
3. Click **"Next"**

### Bước 3: Điền thông tin doanh nghiệp
1. **Industry category**: Chọn `Finance` hoặc `Online Communities`
2. **Business size**: Chọn `Small` (1-10 employees)
3. Click **"Next"**

### Bước 4: Chọn mục tiêu
1. Tick vào:
   - ☑️ **Generate leads** (thu thập khách hàng tiềm năng)
   - ☑️ **Examine user behavior** (phân tích hành vi người dùng)
2. Click **"Create"**
3. Đồng ý **Terms of Service** → Click **"I Accept"**

### Bước 5: Thiết lập Data Stream (Web)
1. Chọn platform: **Web** (biểu tượng `</>`)
2. Điền thông tin:
   - **Website URL**: `https://vayonline.io.vn`
   - **Stream name**: `Vay Online Website`
3. Click **"Create stream"**

### Bước 6: Lấy Measurement ID
1. Sau khi tạo stream, màn hình hiện **"Web stream details"**
2. Tìm dòng **"Measurement ID"**: `G-XXXXXXXXXX` (dạng `G-` + 10 ký tự)
3. **Copy toàn bộ ID này** (ví dụ: `G-1A2B3C4D5E`)
4. **GỬI CHO EM** → Em sẽ thay vào code

---

## Phần 2: Google Search Console

### Bước 1: Truy cập Google Search Console
1. Vào: https://search.google.com/search-console/
2. Đăng nhập bằng Gmail của anh
3. Click **"Add property"** hoặc **"Start now"**

### Bước 2: Chọn loại property
1. Chọn **"URL prefix"** (bên phải)
   - KHÔNG chọn "Domain" (phức tạp hơn)
2. Nhập: `https://vayonline.io.vn`
3. Click **"Continue"**

### Bước 3: Xác minh quyền sở hữu
Google sẽ hiển thị nhiều phương pháp verify. **Chọn 1 trong 2 cách sau:**

#### 🔹 **CÁCH 1: HTML Tag (Khuyên dùng - Dễ nhất)**
1. Trong màn hình verify, chọn tab **"HTML tag"**
2. Google sẽ cho 1 đoạn code như này:
   ```html
   <meta name="google-site-verification" content="abc123xyz456..." />
   ```
3. **Copy toàn bộ dòng này** (từ `<meta` đến `/>`
4. **GỬI CHO EM** → Em sẽ thêm vào `<head>` của index.html

#### 🔹 **CÁCH 2: HTML File Upload**
1. Trong màn hình verify, chọn tab **"HTML file"**
2. Google cho link download file như `google1234567890abcdef.html`
3. Click **"Download"** → lưu file về máy
4. **GỬI FILE CHO EM** → Em upload lên GitHub Pages

### Bước 4: Sau khi em add vào web
1. Đợi **2-3 phút** để GitHub Pages build xong
2. Quay lại Google Search Console
3. Click **"Verify"**
4. Nếu thành công → ✅ "Ownership verified"

### Bước 5: Submit Sitemap (sau khi verify thành công)
1. Trong Google Search Console, menu bên trái → **"Sitemaps"**
2. Phần "Add a new sitemap", nhập: `sitemap.xml`
3. Click **"Submit"**
4. Xong! Google sẽ bắt đầu crawl web của anh

---

## Tóm tắt - Anh cần gửi em:

### ✅ Từ Google Analytics:
- **Measurement ID** (dạng `G-XXXXXXXXXX`)

### ✅ Từ Google Search Console (chọn 1 trong 2):
- **Cách 1**: Meta tag verification (đoạn code `<meta name="google-site-verification"...`)
- **Cách 2**: HTML file (file `.html` download từ Google)

---

## Sau khi setup xong, anh sẽ có gì?

### 📊 Google Analytics cho anh biết:
- Bao nhiêu người vào web mỗi ngày
- Họ ở đâu (thành phố nào)
- Dùng điện thoại hay máy tính
- Xem trang nào nhiều nhất
- Bao nhiêu người điền form
- Bao nhiêu người click vào đối tác vay

### 🔍 Google Search Console cho anh biết:
- Web có lỗi gì không
- Từ khóa nào người ta tìm thấy web của anh
- Vị trí của web trên Google (ranking)
- Bao nhiêu trang đã được Google index
- Có vấn đề về mobile-friendly không

---

## Câu hỏi thường gặp

**Q: Bao lâu thì có data?**
- Google Analytics: Có data ngay sau vài phút
- Search Console: Cần 2-3 ngày để có đủ data

**Q: Mất phí không?**
- Hoàn toàn MIỄN PHÍ!

**Q: Có cần cài gì thêm không?**
- Không! Chỉ cần em add code vào web là xong.

---

**Anh làm từng bước và gửi thông tin cho em nhé! Em đang chờ 🥋**
