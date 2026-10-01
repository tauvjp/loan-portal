// Affiliate destinations supplied by the site owner. Preserve tracking parameters.
// Introductions adapted from owner-supplied copy; approval and timing are conditional.
// Unknown loan terms remain null and direct readers to the provider.
export type Partner = {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  highlights: string[];
  promotion?: { title: string; note: string; sourceUrl: string };
  limit: string | null;
  term: string | null;
  cost: string | null;
  url: string | null;
};
export const partners: Partner[] = [
  {
    id: "moneyveo", name: "Moneyveo", logo: "/images/partners/moneyveo.png",
    tagline: "Kết nối tài chính",
    description: "Moneyveo sử dụng công nghệ để kết nối người có nhu cầu vay với đối tác cho vay. Nền tảng hỗ trợ đăng ký trực tuyến và nhận tiền qua tài khoản ngân hàng khi hồ sơ được phê duyệt. Moneyveo không trực tiếp cho vay.",
    highlights: ["Kết nối với đối tác cho vay", "Đăng ký trực tuyến", "Nhận tiền qua ngân hàng"],
    limit: null, term: null, cost: null,
    url: "https://go.dinos.click/click?a=8782&o=663",
  },
  {
    id: "vayvnd", name: "Vayvnd", logo: "/images/partners/vayvnd.png",
    tagline: "Đăng ký vay từ xa",
    description: "Vayvnd hỗ trợ kết nối tài chính trực tuyến, giúp khách hàng đăng ký từ xa mà không cần đến văn phòng. Hồ sơ được xem xét theo điều kiện của đơn vị cung cấp khoản vay; tiền được chuyển vào tài khoản ngân hàng khi được chấp thuận.",
    highlights: ["Không cần đến văn phòng", "Theo dõi hồ sơ trực tuyến", "Nhận tiền qua ngân hàng"],
    limit: null, term: null, cost: null,
    url: "https://go.dinos.click/click?a=8782&o=277",
  },
  {
    id: "moneycat", name: "MoneyCat", logo: "/images/partners/moneycat.png",
    tagline: "Tư vấn tài chính online",
    description: "MoneyCat cung cấp dịch vụ tư vấn tài chính trực tuyến, hỗ trợ khách hàng tìm hiểu khoản vay và đăng ký từ xa. Bạn có thể thực hiện các bước đăng ký online, chuẩn bị giấy tờ căn cước theo yêu cầu và nhận tư vấn qua điện thoại.",
    highlights: ["Đăng ký trực tuyến", "Giấy tờ căn cước theo yêu cầu", "Tư vấn qua điện thoại"],
    promotion: {
      title: "Ưu đãi lãi suất 0% cho khoản vay đầu tiên",
      note: "Áp dụng theo chương trình và điều kiện của MoneyCat tại thời điểm đăng ký. Kiểm tra thời hạn ưu đãi, các khoản phí và tổng số tiền phải trả trước khi xác nhận khoản vay.",
      sourceUrl: "https://moneycat.vn/page/bi-quyet-vay-tin-chap-online-nhanh-chong",
    },
    limit: null, term: null, cost: null,
    url: "https://go.dinos.click/click?a=8782&o=762",
  },
];
