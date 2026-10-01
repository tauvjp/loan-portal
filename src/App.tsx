"use client";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Check, CheckCheck, CircleHelp, FileText, HandCoins, Info, LockKeyhole, Menu, Minus, Plus, ShieldCheck, SlidersHorizontal, Wallet, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { partners, type Partner } from "@/lib/partners";

const money = (value: number) => new Intl.NumberFormat("vi-VN").format(value);
const presets = [2000000, 3000000, 5000000, 10000000];
const questions = [
  { q: "VayOnline có trực tiếp cho vay không?", a: "VayOnline là trang giới thiệu và hỗ trợ tìm hiểu các lựa chọn vay. Trang không trực tiếp cấp khoản vay hay quyết định duyệt hồ sơ. Điều kiện và hợp đồng do đơn vị cung cấp dịch vụ công bố." },
  { q: "Tôi có cần nhập số điện thoại để xem thông tin?", a: "Không. Bạn có thể xem thông tin trên VayOnline mà không cần cung cấp họ tên hay số điện thoại. Nếu quyết định đăng ký, bạn sẽ thực hiện trên trang của đối tác." },
  { q: "Chọn số tiền có đồng nghĩa với đăng ký vay không?", a: "Không. Số tiền bạn chọn chỉ thể hiện nhu cầu tham khảo, không phải hồ sơ đăng ký hay cam kết vay. Hạn mức được duyệt, nếu có, do đối tác thông báo sau khi xem xét hồ sơ." },
  { q: "Tôi cần xem những gì trước khi đăng ký?", a: "Hãy kiểm tra số tiền thực nhận, tổng tiền phải trả, lãi suất, các khoản phí, ngày thanh toán và điều kiện trả chậm. Chỉ tiếp tục khi bạn hiểu các điều khoản và thấy phù hợp với khả năng chi trả." },
];
function Brand() { return <a className="brand" href="#top" aria-label="VayOnline — về đầu trang"><span className="brand-symbol" aria-hidden="true">v<span>.</span></span><span>vay<span className="brand-light">online</span><span className="brand-dot">.</span></span></a>; }

function PartnerLogo({partner}: {partner: Partner}) {
  return <span className={"partner-logo partner-logo-"+partner.id} aria-hidden="true">
    <img src={partner.logo} alt="" width={1600} height={1600} loading="lazy" decoding="async"/>
  </span>;
}
function PartnerOverview({partner, showSource=false}: {partner: Partner; showSource?: boolean}) {
  return <div className="partner-overview">
    <p>{partner.description}</p>
    <ul className="partner-highlights" aria-label={"Điểm nổi bật của "+partner.name}>
      {partner.highlights.map(item=><li key={item}><Check size={16} aria-hidden="true"/><span>{item}</span></li>)}
    </ul>
    {partner.promotion && <div className="partner-promotion">
      <strong>{partner.promotion.title}</strong>
      <p>{partner.promotion.note}</p>
      {showSource && <a href={partner.promotion.sourceUrl} target="_blank" rel="noopener noreferrer">Thông tin ưu đãi từ {partner.name} (mở tab mới)</a>}
    </div>}
  </div>;
}

export default function Home() {
  const [amount, setAmount] = useState(5000000);
  const [selected, setSelected] = useState<Partner | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [showMobileAction, setShowMobileAction] = useState(false);
  useEffect(() => {
    const panel = document.getElementById("chon-khoan-vay");
    if (!panel || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setShowMobileAction(!entry.isIntersecting && entry.boundingClientRect.bottom < 80), {rootMargin:"-80px 0px 0px 0px"});
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const slider = document.querySelector('[data-slot="slider-thumb"]');
    slider?.setAttribute("aria-label", "Số tiền muốn tham khảo");
    slider?.setAttribute("aria-valuetext", money(amount) + " đồng");
  }, [amount]);
  useEffect(() => {
    type Context = { registerTool: (tool: {name:string;title:string;description:string;inputSchema:object;annotations:object;execute:(input:unknown)=>unknown}, options:{signal:AbortSignal})=>unknown };
    const context = (document as Document & {modelContext?:Context}).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try { void Promise.resolve(context.registerTool({
      name: "set_reference_loan_amount", title: "Chọn số tiền tham khảo",
      description: "Update the reference amount shown on VayOnline. Does not submit a loan application or filter unverified offers.",
      inputSchema: {type:"object",properties:{amount:{type:"integer",minimum:1000000,maximum:10000000,multipleOf:500000}},required:["amount"],additionalProperties:false},
      annotations:{readOnlyHint:false,untrustedContentHint:false},
      execute(input) { const data = input as {amount?:unknown}; if (!data || Object.keys(data).some(key=>key!=="amount") || typeof data.amount!=="number" || !Number.isInteger(data.amount) || data.amount<1000000 || data.amount>10000000 || data.amount%500000!==0) throw new Error("Số tiền phải từ 1 đến 10 triệu đồng, theo bước 500.000 đồng."); flushSync(()=>setAmount(data.amount as number)); return {amount:data.amount,currency:"VND",applicationSubmitted:false}; }
    }, {signal:lifecycle.signal})).catch(()=>{}); } catch { /* Optional browser capability. */ }
    return ()=>lifecycle.abort();
  }, []);
  function visitPartners() {
    const target = document.getElementById("doi-tac");
    if (!target) return;
    target.setAttribute("tabindex", "-1");
    target.focus({preventScroll:true});
    target.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});
  }

  return <>
    <a className="skip-link" href="#main">Chuyển đến nội dung</a>

    <header className="site-header" id="top"><div className="container header-inner"><Brand/><nav className="desktop-nav" aria-label="Điều hướng chính"><a href="#doi-tac">Lựa chọn vay</a><a href="#huong-dan">Cách hoạt động</a><a href="#cau-hoi">Câu hỏi thường gặp</a></nav><a className="header-cta" href="#chon-khoan-vay">Tìm khoản vay</a><button className="menu-button" aria-label={menuOpen?"Đóng menu":"Mở menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button></div>{menuOpen && <nav id="mobile-menu" className="mobile-nav" aria-label="Điều hướng điện thoại">{[["#doi-tac","Lựa chọn vay"],["#huong-dan","Cách hoạt động"],["#cau-hoi","Câu hỏi thường gặp"]].map(([href,label])=><a href={href} key={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}</nav>}</header>
    <main id="main">
      <section className="hero"><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/> TÌM HIỂU KHOẢN VAY ONLINE</div><h1>Dễ tìm hiểu.<br/><span>Dễ lựa chọn.</span></h1><p className="hero-description">Tìm hiểu các dịch vụ vay tại một nơi. Chọn theo nhu cầu, quyết định khi bạn sẵn sàng.</p><div className="hero-checks"><span><Check/>Không cần tạo tài khoản</span><span><Check/>Không nhập thông tin cá nhân</span></div><a className="hero-guide-link" href="#huong-dan"><CircleHelp size={17}/> VayOnline hoạt động như thế nào?</a></div>
        <figure className="hero-visual"><img src="/images/vayonline-hero-bright.webp" alt="Ảnh minh họa người phụ nữ sử dụng điện thoại trong không gian tươi sáng" width={768} height={1024} fetchPriority="high" decoding="async"/><figcaption><span className="photo-label"><Wallet size={15}/> Bắt đầu từ nhu cầu của bạn</span><span className="image-credit">Ảnh minh họa</span></figcaption></figure>
        <div className="loan-panel" id="chon-khoan-vay"><div className="panel-heading"><span className="icon-box"><Wallet size={21}/></span><div><h2>Bạn đang cần bao nhiêu?</h2><p>Chọn nhanh hoặc kéo thanh bên dưới</p></div></div><div className="amount-control"><button className="amount-step" onClick={()=>setAmount(Math.max(1000000,amount-500000))} disabled={amount<=1000000} aria-label="Giảm 500.000 đồng"><Minus size={18}/></button><output className="amount-number" aria-live="polite">{money(amount)}<span>đ</span></output><button className="amount-step" onClick={()=>setAmount(Math.min(10000000,amount+500000))} disabled={amount>=10000000} aria-label="Tăng 500.000 đồng"><Plus size={18}/></button></div><Slider className="loan-slider" value={[amount]} onValueChange={([value])=>setAmount(value)} min={1000000} max={10000000} step={500000} aria-label="Số tiền muốn vay"/><div className="slider-labels"><span>1 triệu</span><span>10 triệu</span></div><div className="amount-presets" aria-label="Chọn nhanh số tiền">{presets.map(value=><button key={value} aria-pressed={amount===value} className={amount===value?"preset active":"preset"} onClick={()=>setAmount(value)}>{value/1000000} triệu</button>)}</div><button className="button-primary find-button" onClick={visitPartners}>Xem các dịch vụ</button><p className="panel-note"><LockKeyhole size={14}/> Chỉ tham khảo, chưa phải đăng ký vay</p></div>
      </div></section>
      <nav className="journey-nav" aria-label="Các bước tham khảo"><div className="container journey-inner"><a href="#chon-khoan-vay"><span>01</span><div><strong>Chọn nhu cầu</strong><small>Số tiền bạn muốn tham khảo</small></div></a><a href="#doi-tac"><span>02</span><div><strong>Tìm hiểu dịch vụ</strong><small>Xem điều kiện và chi phí</small></div></a><a href="#huong-dan"><span>03</span><div><strong>Chủ động quyết định</strong><small>Tiếp tục khi bạn sẵn sàng</small></div></a></div></nav>
      <section className="partners-section section-space" id="doi-tac"><div className="container">
        <div className="section-heading"><div><div className="eyebrow">CÁC DỊCH VỤ THAM KHẢO</div><h2>Xem rõ hơn. Chọn dễ hơn.</h2><p>Cùng một cách trình bày để bạn dễ đối chiếu.</p></div><div className="selection-chip"><Wallet size={16}/><span>Nhu cầu: <strong>{money(amount)} đ</strong></span><a href="#chon-khoan-vay" aria-label="Thay đổi số tiền tham khảo">Thay đổi</a></div></div>
        <div className="directory-note"><span>LIÊN KẾT GIỚI THIỆU</span><p>Xem điều kiện, lãi suất và phí tại trang đối tác trước khi đăng ký.</p></div>
        <div className="partner-directory">
          <div className="directory-labels" aria-hidden="true"><span>Dịch vụ</span><span>Hạn mức</span><span>Kỳ hạn</span><span>Lãi suất & phí</span><span>Đăng ký</span></div>
          {partners.map(partner=><article className={"partner-row partner-"+partner.id} key={partner.id}>
            <div className="partner-identity"><PartnerLogo partner={partner}/><div><h3>{partner.name}</h3><p>{partner.tagline}</p></div></div>
            <dl className="row-facts"><div><dt>Hạn mức</dt><dd>{partner.limit||"Xem tại đối tác"}</dd></div><div><dt>Kỳ hạn</dt><dd>{partner.term||"Xem tại đối tác"}</dd></div><div><dt>Lãi suất & phí</dt><dd>{partner.cost||"Xem tại đối tác"}</dd></div></dl>
            <div className="partner-actions">{partner.url && <a className="button-primary" href={partner.url} target="_blank" rel="sponsored nofollow noopener noreferrer" aria-label={"Đăng ký tại "+partner.name+" (mở tab mới)"}>Đăng ký ngay</a>}<button className="text-button" onClick={()=>setSelected(partner)} aria-label={"Xem thông tin "+partner.name}>Xem thông tin</button></div>
            <PartnerOverview partner={partner}/>
          </article>)}
        </div>
        <div className="partner-context"><Info size={17}/><p>Số tiền bạn chọn chỉ là nhu cầu tham khảo. Hạn mức được duyệt, kỳ hạn và chi phí thực tế do đơn vị cung cấp khoản vay quyết định.</p></div>
        <div className="service-promises"><span><Check size={16}/> Tự do tìm hiểu</span><span><Check size={16}/> Không cần để lại số điện thoại</span><span><Check size={16}/> Chủ động lựa chọn</span></div>
      </div></section>
      <section className="how-section section-space" id="huong-dan"><div className="container guide-grid">
        <div className="guide-main"><div className="eyebrow">TỪ TÌM HIỂU ĐẾN LỰA CHỌN</div><h2>Đơn giản trong từng bước.</h2><p className="guide-description">Bạn luôn biết mình đang ở bước nào.</p>
          <ol className="step-list"><li><span className="step-number">1</span><div><h3>Chọn số tiền bạn cần</h3><p>Xác định nhu cầu, xem các dịch vụ ngay trên VayOnline.</p></div></li><li><span className="step-number">2</span><div><h3>Tìm hiểu điều kiện khoản vay</h3><p>Chọn dịch vụ để tìm hiểu. Hạn mức, kỳ hạn, lãi suất và phí được công bố tại trang đối tác.</p></div></li><li><span className="step-number">3</span><div><h3>Đăng ký trực tiếp tại đối tác</h3><p>Bấm “Đăng ký ngay” để mở trang đối tác. Đọc kỹ điều khoản rồi thực hiện đăng ký nếu phù hợp.</p></div></li></ol>
        </div>
        <aside className="decision-panel"><div className="decision-intro"><div><span className="decision-icon"><FileText size={25}/></span><div className="eyebrow">TRƯỚC KHI ĐĂNG KÝ</div><h2>3 thông tin<br/> nên xem kỹ.</h2></div><img className="decision-photo" src="/images/vayonline-guide-bright.webp" alt="Ảnh minh họa sổ ghi chép và điện thoại trên bàn làm việc sáng màu" width={600} height={400} loading="lazy" decoding="async"/></div><div className="decision-list"><div><CheckCheck/><p><strong>Tổng số tiền phải trả</strong><span>Tiền gốc, lãi và các khoản phí.</span></p></div><div><CheckCheck/><p><strong>Ngày và kỳ hạn thanh toán</strong><span>Cân đối với khả năng chi trả.</span></p></div><div><CheckCheck/><p><strong>Điều khoản khoản vay</strong><span>Phí trả chậm, tất toán và điều kiện áp dụng.</span></p></div></div><div className="decision-footnote"><ShieldCheck size={18}/><span>VayOnline giới thiệu dịch vụ,<br/> không trực tiếp cho vay.</span></div></aside>
      </div></section>
      <section className="faq-section section-space" id="cau-hoi"><div className="container faq-grid"><div className="faq-intro"><span className="icon-box"><CircleHelp size={25}/></span><div className="eyebrow">CÂU HỎI THƯỜNG GẶP</div><h2>Hiểu rõ trước<br/> khi bắt đầu.</h2><p>Câu trả lời ngắn gọn<br/> cho điều bạn quan tâm.</p></div><Accordion type="single" collapsible className="faq-list">{questions.map((question,index)=><AccordionItem value={`faq-${index}`} key={question.q}><AccordionTrigger className="faq-question">{question.q}</AccordionTrigger><AccordionContent className="faq-answer">{question.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    </main>
    <footer className="site-footer"><div className="container"><div className="footer-main"><div className="footer-brand"><Brand/><p>Tìm hiểu rõ. Lựa chọn chủ động.</p></div><nav aria-label="Điều hướng cuối trang"><a href="#doi-tac">Lựa chọn vay</a><a href="#huong-dan">Cách hoạt động</a><a href="#cau-hoi">Câu hỏi thường gặp</a></nav></div><div className="footer-disclosure"><Info size={17}/><p>VayOnline là trang giới thiệu dịch vụ, không phải đơn vị cho vay. Chúng tôi có thể nhận hoa hồng khi bạn đăng ký qua liên kết giới thiệu. Quyết định phê duyệt và điều kiện khoản vay do đối tác cung cấp.</p></div><div className="footer-bottom"><span>© {new Date().getFullYear()} VayOnline</span><button onClick={()=>setShowDisclosure(true)}>Thông tin & quyền riêng tư</button><span>Tham khảo chủ động, quyết định rõ ràng.</span></div></div></footer>
    {showMobileAction && <div className="mobile-action"><div><span>Nhu cầu của bạn</span><strong>{money(amount)} đ</strong></div><button className="button-primary" onClick={visitPartners}>Xem dịch vụ</button></div>}
    <Dialog open={selected!==null} onOpenChange={open=>{if(!open)setSelected(null)}}><DialogContent className="detail-dialog" showCloseButton={false}><DialogClose className="dialog-close" aria-label="Đóng thông tin"><X size={20}/></DialogClose><DialogHeader>{selected && <PartnerLogo partner={selected}/>}<DialogTitle className="dialog-title">{selected?.name}</DialogTitle><DialogDescription className="dialog-description">{selected?.tagline}</DialogDescription></DialogHeader>{selected && <PartnerOverview partner={selected} showSource/>}<div className="modal-amount"><span>Nhu cầu tham khảo của bạn</span><strong>{money(amount)} đ</strong></div><dl className="partner-facts modal-facts"><div><dt>Hạn mức</dt><dd>{selected?.limit||"Xem tại đối tác"}</dd></div><div><dt>Kỳ hạn</dt><dd>{selected?.term||"Xem tại đối tác"}</dd></div><div><dt>Lãi suất & phí</dt><dd>{selected?.cost||"Xem tại đối tác"}</dd></div></dl><div className="modal-notice"><Info size={18}/><p>Liên kết giới thiệu sẽ mở trang bên ngoài trong tab mới. Hãy kiểm tra hạn mức, tổng chi phí và điều khoản do dịch vụ công bố trước khi đăng ký.</p></div>{selected?.url?<a className="button-primary" href={selected.url} target="_blank" rel="sponsored nofollow noopener noreferrer" aria-label={"Đăng ký tại "+selected.name+" (mở tab mới)"}>Đăng ký tại {selected.name}</a>:<button className="button-primary" disabled>Chưa mở đăng ký</button>}<DialogClose className="text-button">Quay lại các lựa chọn</DialogClose></DialogContent></Dialog>
    <Dialog open={showDisclosure} onOpenChange={setShowDisclosure}><DialogContent className="detail-dialog" showCloseButton={false}><DialogClose className="dialog-close" aria-label="Đóng thông tin"><X size={20}/></DialogClose><DialogHeader><DialogTitle className="dialog-title">Thông tin & quyền riêng tư</DialogTitle><DialogDescription className="dialog-description">Cách VayOnline sử dụng thông tin</DialogDescription></DialogHeader><div className="policy-copy"><h3>Thông tin bạn cung cấp</h3><p>Trang này không có biểu mẫu thu thập họ tên, số điện thoại hay hồ sơ vay. Số tiền bạn chọn chỉ được giữ trong phiên xem trang và được đặt lại khi tải lại trang.</p><h3>Thống kê lượt truy cập</h3><p>Website sử dụng Google Analytics để thống kê lượt truy cập và tương tác. Công cụ này có thể sử dụng cookie và dữ liệu thiết bị theo chính sách của Google.</p><h3>Liên kết giới thiệu</h3><p>Liên kết giới thiệu có thể ghi nhận lượt truy cập để tính hoa hồng. Việc đăng ký và cung cấp thông tin cá nhân diễn ra trên website bên ngoài, theo chính sách riêng của đơn vị tiếp nhận hồ sơ.</p><h3>Trước khi đăng ký</h3><p>Kiểm tra địa chỉ website, điều kiện dịch vụ và chính sách sử dụng thông tin của đơn vị tiếp nhận hồ sơ.</p></div><DialogClose className="button-primary">Đã hiểu</DialogClose></DialogContent></Dialog>
  </>;
}
