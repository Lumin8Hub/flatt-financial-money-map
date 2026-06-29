import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Money Map · Income Dashboard" },
      {
        name: "description",
        content:
          "Lumin8 Agency + Household income dashboard — last 3 months (Apr–Jun 2026).",
      },
      { property: "og:title", content: "The Money Map · Income Dashboard" },
      {
        property: "og:description",
        content:
          "Where the family's money comes from, what's dependable, and what the business really nets.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js",
      },
    ],
  }),
  component: Index,
});

const STYLES = `
:root{
  --bg:#E9ECEA; --surface:#FFFFFF; --line:#DCE0DD;
  --ink:#1B2630; --slate:#5C6A69; --faint:#8A9695;
  --brass:#A9802F; --brass-soft:#E8DCC2;
  --forest:#2C6B5C; --forest-soft:#D6E5E0;
  --clay:#B4452F; --clay-soft:#F0D9D1;
  --steel:#3E6075; --steel-soft:#D7E0E6;
  --plum:#6A4A6E; --plum-soft:#E4D8E6;
  --shadow:0 1px 2px rgba(27,38,48,.04),0 8px 24px rgba(27,38,48,.06);
}
.mm *{box-sizing:border-box;margin:0;padding:0}
.mm{background:var(--bg);color:var(--ink);font-family:"Inter",system-ui,sans-serif;
  line-height:1.5;padding:32px 20px 80px;-webkit-font-smoothing:antialiased;min-height:100vh}
.mm .wrap{max-width:1100px;margin:0 auto}
.mm .num{font-family:"Space Grotesk",sans-serif;font-variant-numeric:tabular-nums}

.mm .masthead{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;
  border-bottom:2px solid var(--ink);padding-bottom:18px}
.mm .eyebrow{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--brass);font-weight:600}
.mm h1{font-family:"Space Grotesk";font-weight:600;font-size:clamp(26px,5vw,44px);letter-spacing:-.02em;line-height:1.03;margin-top:6px}
.mm .period{font-family:"Space Grotesk";font-size:13px;color:var(--slate);text-align:right;font-weight:500}
.mm .period b{color:var(--ink)}

.mm .verdict{font-size:clamp(14.5px,2.2vw,18px);margin:22px 0 8px;max-width:92ch;line-height:1.6}
.mm .verdict b{color:var(--forest)} .mm .verdict .r{color:var(--clay)} .mm .verdict .br{color:var(--brass)}
.mm .banner{background:#fcefea;border:1px solid var(--clay);border-radius:12px;padding:15px 18px;font-size:13.5px;color:var(--ink);line-height:1.55;margin-top:16px;max-width:92ch}
.mm .banner b{color:var(--clay)}

.mm section{margin:46px 0}
.mm .sec-head{display:flex;align-items:baseline;gap:14px;margin-bottom:6px;flex-wrap:wrap}
.mm .sec-num{font-family:"Space Grotesk";font-size:12px;color:var(--faint);font-weight:600;letter-spacing:.1em}
.mm h2{font-family:"Space Grotesk";font-weight:600;font-size:clamp(19px,3.2vw,23px);letter-spacing:-.01em}
.mm .sec-sub{color:var(--slate);font-size:14px;margin:2px 0 22px;max-width:84ch}

.mm .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.mm .stats.four{grid-template-columns:repeat(4,1fr)}
.mm .stat{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px;box-shadow:var(--shadow)}
.mm .stat .lab{font-size:11.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--slate);font-weight:600}
.mm .stat .big{font-family:"Space Grotesk";font-size:clamp(22px,3.6vw,33px);font-weight:600;letter-spacing:-.02em;margin-top:7px;line-height:1}
.mm .stat .sub{font-size:12.5px;color:var(--faint);margin-top:6px;line-height:1.45}
.mm .stat .big small{font-size:16px;color:var(--faint)}
.mm .in .big{color:var(--forest)} .mm .out .big{color:var(--ink)} .mm .net .big{color:var(--brass)}
.mm .dan .big{color:var(--steel)} .mm .dorit .big{color:var(--plum)}
.mm .hero{background:linear-gradient(180deg,#fff,#fff),var(--forest-soft);border-color:#bcd6cd}

.mm .card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:24px;box-shadow:var(--shadow)}
.mm .chartbox{position:relative;height:330px}
.mm .chartbox.tall{height:380px}
.mm .grid2{display:grid;grid-template-columns:1.05fr .95fr;gap:22px;align-items:start}
.mm .grid2.even{grid-template-columns:1fr 1fr}
.mm .cap{font-size:12.5px;color:var(--faint);margin-top:12px;line-height:1.5}

.mm .lrow{display:flex;align-items:center;gap:14px;padding:11px 0;border-bottom:1px solid var(--line)}
.mm .lrow:last-child{border-bottom:none}
.mm .lrow .nm{flex:0 0 200px;font-weight:500;font-size:14px;min-width:0}
.mm .lrow .nm small{display:block;color:var(--faint);font-weight:400;font-size:11.5px}
.mm .track{flex:1;height:11px;background:var(--bg);border-radius:6px;overflow:hidden;min-width:40px}
.mm .fill{height:100%;border-radius:6px}
.mm .lrow .amt{flex:0 0 124px;text-align:right;font-family:"Space Grotesk";font-weight:600;font-size:14.5px}
.mm .lrow .amt small{display:block;color:var(--faint);font-weight:400;font-size:11px}

.mm .deps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.mm .depcol{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:18px 18px 8px;box-shadow:var(--shadow)}
.mm .depcol h4{font-family:"Space Grotesk";font-size:14px;font-weight:600;letter-spacing:.02em;display:flex;align-items:center;gap:8px;padding-bottom:12px;border-bottom:1px solid var(--line)}
.mm .depcol.green h4{color:var(--forest)} .mm .depcol.brass h4{color:var(--brass)} .mm .depcol.clay h4{color:var(--clay)}
.mm .pin{width:9px;height:9px;border-radius:50%;display:inline-block}
.mm .item{padding:12px 0;border-bottom:1px solid var(--line)}
.mm .item:last-child{border-bottom:none}
.mm .item .t{font-weight:600;font-size:13.5px;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap}
.mm .item .t .v{font-family:"Space Grotesk";font-weight:600;white-space:nowrap}
.mm .item .d{font-size:12px;color:var(--slate);margin-top:3px;line-height:1.45}
.mm .strike .t{color:var(--faint)} .mm .strike .t .v{text-decoration:line-through;color:var(--faint)}

.mm .callout{display:grid;grid-template-columns:auto 1fr;gap:22px;align-items:center;border-radius:14px;padding:22px 24px;box-shadow:var(--shadow)}
.mm .callout.brass{background:linear-gradient(180deg,#fff,#fff),#fbf6ec;border:1px solid var(--brass)}
.mm .callout.clay{background:linear-gradient(180deg,#fff,#fff),#fcefea;border:1px solid var(--clay)}
.mm .callout .fig{font-family:"Space Grotesk";font-weight:600;font-size:clamp(26px,5vw,42px);letter-spacing:-.02em;line-height:1;color:var(--brass)}
.mm .callout.clay .fig{color:var(--clay)}
.mm .callout .fig small{display:block;font-size:13px;color:var(--slate);font-weight:500;margin-top:7px}
.mm .callout p{font-size:14px;color:var(--ink);line-height:1.55}
.mm .callout p b{color:var(--brass)} .mm .callout.clay p b{color:var(--clay)}

.mm .qa{display:flex;flex-direction:column;margin-top:4px}
.mm .q{font-size:13px;color:var(--slate);line-height:1.5;padding:11px 0;border-bottom:1px solid var(--line)}
.mm .q:last-child{border-bottom:none}
.mm .q b{color:var(--ink)}

.mm .pl{display:flex;flex-direction:column;gap:2px}
.mm .plrow{display:flex;align-items:center;gap:14px;padding:9px 0}
.mm .plrow .pnm{flex:0 0 230px;font-size:13.5px;font-weight:500;min-width:0}
.mm .plrow .pnm small{color:var(--faint);font-weight:400}
.mm .plbar{flex:1;height:26px;background:var(--bg);border-radius:6px;position:relative;overflow:hidden;min-width:40px}
.mm .plbar span{position:absolute;left:0;top:0;height:100%;border-radius:6px;display:flex;align-items:center;justify-content:flex-end;padding-right:9px;color:#fff;font-family:"Space Grotesk";font-weight:600;font-size:12.5px;white-space:nowrap}
.mm .plrow.tot{border-top:1px solid var(--line);margin-top:4px;padding-top:12px}
.mm .plrow.tot .pnm{font-weight:700}

.mm table{width:100%;border-collapse:collapse;font-size:13px}
.mm thead th{text-align:left;font-weight:600;color:var(--slate);font-size:11.5px;text-transform:uppercase;letter-spacing:.04em;padding:8px 10px;border-bottom:1px solid var(--line)}
.mm thead th.r,.mm td.r{text-align:right}
.mm tbody td{padding:10px;border-bottom:1px solid var(--line);vertical-align:top}
.mm tbody tr:last-child td{border-bottom:none}
.mm td.amt{font-family:"Space Grotesk";font-weight:600}
.mm .swatch{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:8px;vertical-align:middle}
.mm .table-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}

.mm .tl{position:relative;margin-left:6px;padding-left:28px;border-left:2px solid var(--line)}
.mm .ev{position:relative;padding:0 0 22px 4px}
.mm .ev:last-child{padding-bottom:0}
.mm .ev::before{content:"";position:absolute;left:-37px;top:2px;width:14px;height:14px;border-radius:50%;background:var(--surface);border:3px solid var(--steel)}
.mm .ev.good::before{border-color:var(--forest)} .mm .ev.bad::before{border-color:var(--clay)} .mm .ev.future::before{border-color:var(--brass);background:var(--brass-soft)}
.mm .ev .when{font-family:"Space Grotesk";font-size:12px;font-weight:600;color:var(--brass);letter-spacing:.03em}
.mm .ev .what{font-size:14px;font-weight:600;margin-top:2px}
.mm .ev .why{font-size:13px;color:var(--slate);margin-top:2px;line-height:1.45}

.mm footer{margin-top:54px;padding-top:22px;border-top:1px solid var(--line);font-size:12.5px;color:var(--faint);line-height:1.65}
.mm footer b{color:var(--slate)}
.mm .tag-pill{display:inline-block;font-family:"Space Grotesk";font-size:11px;font-weight:600;color:var(--steel);
  background:var(--steel-soft);padding:3px 9px;border-radius:20px;margin-left:8px;vertical-align:middle;letter-spacing:.02em}
.mm .legend{display:flex;gap:18px;flex-wrap:wrap;font-size:12.5px;color:var(--slate);margin-top:10px}
.mm .legend span{display:inline-flex;align-items:center;gap:7px}
.mm .dot{width:11px;height:11px;border-radius:3px}

@media(max-width:860px){
  .mm .grid2,.mm .grid2.even{grid-template-columns:1fr}
  .mm .deps{grid-template-columns:1fr}
  .mm .stats,.mm .stats.four{grid-template-columns:1fr 1fr}
  .mm .callout{grid-template-columns:1fr;gap:12px}
}
@media(max-width:600px){
  .mm{padding:20px 14px 60px}
  .mm .period{text-align:left}
  .mm .chartbox{height:280px}
  .mm .chartbox.tall{height:320px}
  .mm .card{padding:18px}
  .mm .depcol{padding:16px 16px 6px}
}
@media(max-width:520px){
  .mm .stats,.mm .stats.four{grid-template-columns:1fr}
  .mm .lrow{flex-wrap:wrap}
  .mm .lrow .nm{flex-basis:100%}
  .mm .lrow .track{flex-basis:60%}
  .mm .lrow .amt{flex-basis:35%}
  .mm .plrow{flex-wrap:wrap}
  .mm .plrow .pnm{flex-basis:100%}
  .mm .plrow .plbar{flex-basis:100%}
}
@media(prefers-reduced-motion:reduce){.mm *{animation:none!important;transition:none!important}}
`;

function Index() {
  const monthlyRef = useRef<HTMLCanvasElement | null>(null);
  const shareRef = useRef<HTMLCanvasElement | null>(null);
  const clientRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const charts: any[] = [];

    const init = () => {
      // @ts-expect-error - Chart loaded via CDN
      const Chart = window.Chart;
      if (!Chart) return false;
      if (cancelled) return true;

      const FOREST = "#2C6B5C",
        STEEL = "#3E6075",
        PLUM = "#6A4A6E",
        BRASS = "#A9802F",
        CLAY = "#B4452F",
        INK = "#1B2630",
        LINE = "#DCE0DD";

      Chart.defaults.font.family = "Inter, system-ui, sans-serif";
      Chart.defaults.font.size = 12;
      Chart.defaults.color = INK;
      const money = (v: number) => "$" + v.toLocaleString("en-CA");

      if (monthlyRef.current) {
        charts.push(
          new Chart(monthlyRef.current, {
            type: "bar",
            data: {
              labels: ["April", "May", "June"],
              datasets: [
                { label: "Dan · TBDC pay", data: [6456, 6456, 6456], backgroundColor: STEEL, stack: "s", borderRadius: 3 },
                { label: "Dorit · business draws", data: [3500, 2000, 4500], backgroundColor: PLUM, stack: "s", borderRadius: 3 },
                { label: "Govt benefits", data: [1315, 1069, 1069], backgroundColor: FOREST, stack: "s", borderRadius: 3 },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "bottom", labels: { boxWidth: 11, boxHeight: 11, usePointStyle: true, pointStyle: "rectRounded", padding: 14 } },
                tooltip: { callbacks: { label: (c: any) => c.dataset.label + ": " + money(c.parsed.y) } },
              },
              scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, grid: { color: LINE }, ticks: { callback: (v: number) => "$" + v / 1000 + "k" } },
              },
            },
          }),
        );
      }

      if (shareRef.current) {
        charts.push(
          new Chart(shareRef.current, {
            type: "doughnut",
            data: {
              labels: ["Dan — employment", "Dorit — business", "Govt benefits"],
              datasets: [{ data: [19369, 10000, 3452], backgroundColor: [STEEL, PLUM, FOREST], borderColor: "#fff", borderWidth: 2 }],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              cutout: "62%",
              plugins: {
                legend: { position: "bottom", labels: { boxWidth: 11, boxHeight: 11, usePointStyle: true, pointStyle: "rectRounded", padding: 14 } },
                tooltip: {
                  callbacks: {
                    label: (c: any) => {
                      const t = c.dataset.data.reduce((a: number, b: number) => a + b, 0);
                      return c.label + ": " + money(c.parsed) + " (" + Math.round((c.parsed / t) * 100) + "%)";
                    },
                  },
                },
              },
            },
          }),
        );
      }

      if (clientRef.current) {
        charts.push(
          new Chart(clientRef.current, {
            type: "bar",
            data: {
              labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                { label: "Acronym", data: [5948, 5085, 7007, 2096, 2119, 5330, 3054, 0, 6708], backgroundColor: FOREST, stack: "s", borderRadius: 2 },
                { label: "Yogen Fruz", data: [4746, 2373, 0, 4746, 0, 4746, 0, 4746, 2373], backgroundColor: STEEL, stack: "s", borderRadius: 2 },
                { label: "Website / ad-hoc", data: [500, 0, 0, 2632, 734, 282, 2938, 1130, 0], backgroundColor: BRASS, stack: "s", borderRadius: 2 },
                { label: "Garage Door Beasts (ended)", data: [0, 0, 0, 4859, 3390, 1695, 2486, 0, 0], backgroundColor: "#D9A99E", stack: "s", borderRadius: 2 },
                { label: "Lewis Legal (ended)", data: [8613, 2825, 8475, 0, 5650, 0, 0, 0, 0], backgroundColor: "#E7CFC9", stack: "s", borderRadius: 2 },
                { label: "Toronto Zionist (ended)", data: [0, 0, 0, 3390, 0, 0, 0, 0, 0], backgroundColor: "#EFE0DC", stack: "s", borderRadius: 2 },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "bottom", labels: { boxWidth: 11, boxHeight: 11, usePointStyle: true, pointStyle: "rectRounded", padding: 10, font: { size: 11 } } },
                tooltip: { callbacks: { label: (c: any) => c.dataset.label + ": " + money(c.parsed.y) } },
              },
              scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, grid: { color: LINE }, ticks: { callback: (v: number) => "$" + v / 1000 + "k" } },
              },
            },
          }),
        );
      }
      // suppress unused warning
      void CLAY;
      return true;
    };

    if (!init()) {
      const id = setInterval(() => {
        if (init()) clearInterval(id);
      }, 100);
      return () => {
        cancelled = true;
        clearInterval(id);
        charts.forEach((c) => c.destroy());
      };
    }
    return () => {
      cancelled = true;
      charts.forEach((c) => c.destroy());
    };
  }, []);

  return (
    <div className="mm">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="wrap">
        <div className="masthead">
          <div>
            <div className="eyebrow">Lumin8 Agency + Household · Richmond Hill</div>
            <h1>The Money Map — Income</h1>
          </div>
          <div className="period">
            Focus window: <b>Apr–Jun 2026</b>
            <br />
            (last 3 months)
            <br />
            <span style={{ color: "var(--faint)" }}>Pay stubs · QuickBooks · bank exports</span>
          </div>
        </div>

        <p className="verdict">
          Over the last three months <b>~$10,900/month</b> in cash lands in the family account — but that figure flatters the business.{" "}
          <b style={{ color: "var(--steel)" }}>Dan's TBDC salary (~$6,456/mo net)</b> is the dependable anchor. The business{" "}
          <b style={{ color: "var(--plum)" }}>drew ~$3,333/mo</b> into the family account, yet on an accrual basis — counting what Lumin8 <i>owes</i>{" "}
          contractors for work already done, not just what it has paid — it only sustainably nets{" "}
          <b style={{ color: "var(--plum)" }}>~$2,350/mo</b>. The ~$1,000/mo difference is being funded by{" "}
          <span className="r">unpaid contractor invoices piling up</span>, chiefly Sydney Finn. With Lewis Legal and Garage Door Beasts now gone, the
          business runs on essentially <b>two recurring clients — Acronym and Yogen Fruz</b> — plus a growing but lumpy{" "}
          <span className="br">website side-line</span>.
        </p>

        <div className="banner">
          <b>⚠ These business figures are provisional.</b> Because Dorit and the contractors invoice late, the books understate true costs. The
          contractor run-rates below are <b>estimates from payment history</b>, not confirmed invoices. Until the open questions in §6 are answered,
          treat Dorit/Lumin8's take-home as a <b>working estimate, not a number to rely on</b>.
        </div>

        {/* 1 */}
        <section>
          <div className="sec-head">
            <span className="sec-num">01</span>
            <h2>Who actually funds the family — last 3 months</h2>
          </div>
          <p className="sec-sub">
            Real dollars landing in the family chequing account (after income tax, EI/CPP, the payroll advance repayment, and after the business pays its
            vendors, expenses and HST). These are net take-home figures, not gross billings.
          </p>

          <div className="stats four">
            <div className="stat hero">
              <div className="lab">Total family income</div>
              <div className="big num">
                $10.9K<small>/mo</small>
              </div>
              <div className="sub">≈ $32.8K over the quarter, all sources combined</div>
            </div>
            <div className="stat dan">
              <div className="lab">Dan · employment (net)</div>
              <div className="big num">
                $6,456<small>/mo</small>
              </div>
              <div className="sub">~59% of family income · highly dependable</div>
            </div>
            <div className="stat dorit">
              <div className="lab">Dorit · business (sustainable)</div>
              <div className="big num">
                ~$2,350<small>/mo</small>
              </div>
              <div className="sub">
                drew $3,333/mo cash — but over-drawing ~$1,000/mo
                <br />
                <b style={{ color: "var(--clay)" }}>provisional · see §3 &amp; §6</b>
              </div>
            </div>
            <div className="stat net">
              <div className="lab">Government benefits</div>
              <div className="big num">
                $1,150<small>/mo</small>
              </div>
              <div className="sub">~11% · CCB, Ontario, GST credit</div>
            </div>
          </div>

          <div className="grid2" style={{ marginTop: 22 }}>
            <div className="card">
              <h4 style={{ fontFamily: "'Space Grotesk'", fontSize: 15, marginBottom: 4 }}>Monthly income into the family account</h4>
              <div className="cap" style={{ marginTop: 0, marginBottom: 8 }}>
                By source, Apr–Jun 2026. Dan's pay is steady; Dorit's draws and benefits are lumpier.
              </div>
              <div className="chartbox">
                <canvas ref={monthlyRef} />
              </div>
            </div>
            <div className="card">
              <h4 style={{ fontFamily: "'Space Grotesk'", fontSize: 15, marginBottom: 4 }}>Share of household income</h4>
              <div className="cap" style={{ marginTop: 0, marginBottom: 8 }}>
                Quarter total ≈ $32,820. Dan is now the majority earner — a reversal from a year ago, when the business carried the household.
              </div>
              <div className="chartbox">
                <canvas ref={shareRef} />
              </div>
            </div>
          </div>
        </section>

        {/* 2 */}
        <section>
          <div className="sec-head">
            <span className="sec-num">02</span>
            <h2>What's dependable, what's a project, what's gone</h2>
          </div>
          <p className="sec-sub">
            Not all income is equal. Three buckets: money you can count on every month, opportunistic project work that helps but can't be banked on, and
            clients that have ended and won't return.
          </p>

          <div className="deps">
            <div className="depcol green">
              <h4>
                <span className="pin" style={{ background: "var(--forest)" }} />
                Consistent / dependable
              </h4>
              <div className="item">
                <div className="t">
                  <span>Dan — TBDC salary</span>
                  <span className="v">$6,456/mo</span>
                </div>
                <div className="d">$135K/yr. Bi-weekly net $3,228 after tax + advance repayment. The household's bedrock.</div>
              </div>
              <div className="item">
                <div className="t">
                  <span>
                    Acronym <small style={{ fontWeight: 400, color: "var(--faint)" }}>(Dorit)</small>
                  </span>
                  <span className="v">~$3,250/mo</span>
                </div>
                <div className="d">
                  Pays as "Bluelime Technical Services" &amp; "Acronym Solutions". Dorit bills hours — variable but ongoing, and high-margin (her own
                  labour).
                </div>
              </div>
              <div className="item">
                <div className="t">
                  <span>
                    Yogen Fruz <small style={{ fontWeight: 400, color: "var(--faint)" }}>(Dorit)</small>
                  </span>
                  <span className="v">$2,373/mo</span>
                </div>
                <div className="d">Steady retainer-like deposit. But delivery is sub-contracted to Sydney Finn (~$1,400/mo when invoiced), so net ≈ $950/mo.</div>
              </div>
              <div className="item">
                <div className="t">
                  <span>Government benefits</span>
                  <span className="v">~$1,150/mo</span>
                </div>
                <div className="d">Canada Child Benefit (~$1,069/mo) + Ontario Trillium + quarterly GST credit.</div>
              </div>
            </div>

            <div className="depcol brass">
              <h4>
                <span className="pin" style={{ background: "var(--brass)" }} />
                Growing — but project-based
              </h4>
              <div className="item">
                <div className="t">
                  <span>AI website line of business</span>
                  <span className="v">~$1,350/mo</span>
                </div>
                <div className="d">
                  New stream: quick AI-built websites at ~$500, plus add-ons (hosting, social, e-commerce). No retainers yet — revenue is one-off and lumpy.
                  Dan builds; Dorit manages &amp; sells.
                </div>
              </div>
              <div className="item">
                <div className="t">
                  <span>
                    ↳ Shannon Leroux <small style={{ fontWeight: 400, color: "var(--faint)" }}>(anchor)</small>
                  </span>
                  <span className="v">$3,842 to date</span>
                </div>
                <div className="d">5 payments since Feb across 3 websites + social plan + e-commerce. The model for a "land &amp; expand" web client.</div>
              </div>
              <div className="item">
                <div className="t">
                  <span>↳ One-off web clients</span>
                  <span className="v">$1,243 (3mo)</span>
                </div>
                <div className="d">Adam Soda $565, Randi Yaffa $678 (Apr). Earlier: Jonathan Karten $1,785, Hannah Daniels $848.</div>
              </div>
              <div className="item">
                <div className="t">
                  <span>Dan — year-end bonus</span>
                  <span className="v">up to $15K</span>
                </div>
                <div className="d">Per contract, paid later in 2026. Taxed at ~43% marginal → ~$8,500 net. Not yet earned/guaranteed.</div>
              </div>
            </div>

            <div className="depcol clay">
              <h4>
                <span className="pin" style={{ background: "var(--clay)" }} />
                Terminated — not coming back
              </h4>
              <div className="item strike">
                <div className="t">
                  <span>Lewis Legal</span>
                  <span className="v">~$2,825/mo</span>
                </div>
                <div className="d">
                  Dan's client (paid via Lewis &amp; Assoc; Alana handled their payroll). Ended Feb 2026 when Dan joined TBDC. Last payment $5,650 (Feb 6).
                </div>
              </div>
              <div className="item strike">
                <div className="t">
                  <span>Garage Door Beasts</span>
                  <span className="v">lumpy</span>
                </div>
                <div className="d">Paid as "Dorit Dari". Final payment $2,486 on Apr 10, 2026. This is the loss that left only Acronym + Yogen Fruz.</div>
              </div>
              <div className="item strike">
                <div className="t">
                  <span>Sofiya Gendelman</span>
                  <span className="v">~$2,200/mo</span>
                </div>
                <div className="d">Recurring through mid-2025; last payment Sep 2025.</div>
              </div>
              <div className="item strike">
                <div className="t">
                  <span>Toronto Zionist Council</span>
                  <span className="v">~$2,260/mo</span>
                </div>
                <div className="d">"Camp Shalom" — seasonal. Last payment Jan 2026.</div>
              </div>
            </div>
          </div>
          <div className="legend">
            <span>
              <span className="dot" style={{ background: "var(--forest)" }} />
              Count on it monthly
            </span>
            <span>
              <span className="dot" style={{ background: "var(--brass)" }} />
              Real, but don't bank on it
            </span>
            <span>
              <span className="dot" style={{ background: "var(--clay)" }} />
              Gone
            </span>
          </div>
        </section>

        {/* 3 */}
        <section>
          <div className="sec-head">
            <span className="sec-num">03</span>
            <h2>What the business really nets the family</h2>
          </div>
          <p className="sec-sub">
            Lumin8's last-3-month profit &amp; loss, built from QuickBooks-categorised bank and Visa exports. The question Dan asked: after paying vendors,
            subscriptions, the lease and HST, how much is actually available to take home?
          </p>

          <div className="grid2 even">
            <div className="card">
              <h4 style={{ fontFamily: "'Space Grotesk'", fontSize: 15, marginBottom: 4 }}>
                From billings to take-home{" "}
                <span style={{ fontWeight: 400, color: "var(--faint)", fontSize: 12 }}>· accrual basis, monthly avg</span>
              </h4>
              <div className="cap" style={{ marginTop: 0, marginBottom: 12 }}>
                Costs counted when the <i>work is done</i>, not when paid. Rows marked <b style={{ color: "var(--clay)" }}>◆ accruing</b> are owed but not yet
                invoiced/paid.
              </div>
              <div className="pl">
                <PLRow name="Client revenue collected" width="100%" color="var(--forest)" amount="$7,812" />
                <PLRow name={<>– Sydney Finn <small>◆ Yogen Fruz · $0 paid</small></>} width="18.1%" color="var(--clay)" amount="$1,413" />
                <PLRow name="– Ravil Muldagaliyev" width="7.9%" color="#c8745f" amount="$614" />
                <PLRow name={<>– Sohel Rana <small>◆ partly accruing</small></>} width="1.6%" color="var(--clay)" amount="$69" />
                <PLRow name={<>– Elaine Toribio <small>bookkeeping</small></>} width="4.6%" color="#c8745f" amount="$362" />
                <PLRow name="– Lease, travel, auto" width="12.2%" color="#c8745f" amount="$950" />
                <PLRow name="– Software, hosting, telecom" width="7.9%" color="#c8745f" amount="$614" />
                <PLRow name={<>– Other opex <small>(COGS, fees, meals)</small></>} width="8%" color="#c8745f" amount="$622" />
                <PLRow name="= Operating profit" width="40.6%" color="var(--brass)" amount="$3,169" tot />
                <PLRow name={<>– HST remittance <small>(lumpy)</small></>} width="10.5%" color="var(--steel)" amount="$816" />
                <PLRow name={<>= Net available <small>(sustainable)</small></>} width="30.1%" color="var(--forest)" amount="$2,352" tot />
              </div>
              <div className="cap">
                <b style={{ color: "var(--clay)" }}>Owner draws taken were ~$3,333/mo</b> — about{" "}
                <b style={{ color: "var(--clay)" }}>$1,000/mo more</b> than the business sustainably nets. The difference is funded by deferring contractor
                invoices (mainly Sydney). On a <i>cash</i> basis the business looks like it nets $3,680/mo, but that ignores ~$1,413/mo of unbilled Sydney
                Finn cost. Excludes the $2,135 NSF reversal and ~$139 personal card items.
              </div>
            </div>
            <div className="card">
              <h4 style={{ fontFamily: "'Space Grotesk'", fontSize: 15, marginBottom: 4 }}>Client revenue, month by month</h4>
              <div className="cap" style={{ marginTop: 0, marginBottom: 8 }}>
                The terminated clients (faded) used to stack on top. Today the bars are mostly Acronym + Yogen Fruz + the web side-line.
              </div>
              <div className="chartbox tall">
                <canvas ref={clientRef} />
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 22 }}>
            <h4 style={{ fontFamily: "'Space Grotesk'", fontSize: 15, marginBottom: 4 }}>Contractor &amp; vendor detail — who Dorit pays, and what's owed</h4>
            <div className="cap" style={{ marginTop: 0, marginBottom: 14 }}>
              Run-rates are <b>estimated from each person's full payment history</b> (the bank feed only shows cash out, not invoices). "Owed for period" =
              cost of Apr–Jun work minus what was actually paid in Apr–Jun. Positive = behind / accruing a payable.
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Contractor</th>
                    <th>Role</th>
                    <th className="r">Est. rate/mo</th>
                    <th className="r">Paid Apr–Jun</th>
                    <th className="r">Cost incurred</th>
                    <th className="r">Owed for period</th>
                    <th>Last paid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="swatch" style={{ background: "var(--clay)" }} />
                      <b>Sydney Finn</b> <small style={{ color: "var(--faint)" }}>(Finn Digital)</small>
                    </td>
                    <td>Yogen Fruz delivery</td>
                    <td className="r amt">$1,413</td>
                    <td className="r amt" style={{ color: "var(--clay)" }}>$0</td>
                    <td className="r amt">$4,238</td>
                    <td className="r amt" style={{ color: "var(--clay)" }}>+$4,238</td>
                    <td>Feb 20, 2026</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="swatch" style={{ background: "#c8745f" }} />
                      <b>Ravil Muldagaliyev</b>
                    </td>
                    <td>Subcontractor</td>
                    <td className="r amt">$614</td>
                    <td className="r amt">$2,000</td>
                    <td className="r amt">$1,841</td>
                    <td className="r amt" style={{ color: "var(--forest)" }}>−$159</td>
                    <td>Jun 22, 2026</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="swatch" style={{ background: "var(--clay)" }} />
                      <b>Sohel Rana</b>
                    </td>
                    <td>Micro-tasks (via Wise)</td>
                    <td className="r amt">$69</td>
                    <td className="r amt">$138</td>
                    <td className="r amt">$207</td>
                    <td className="r amt" style={{ color: "var(--clay)" }}>+$69</td>
                    <td>May 1, 2026</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="swatch" style={{ background: "#c8745f" }} />
                      <b>Elaine Toribio</b>
                    </td>
                    <td>Bookkeeping / admin</td>
                    <td className="r amt">$362</td>
                    <td className="r amt">$1,250</td>
                    <td className="r amt">$1,086</td>
                    <td className="r amt" style={{ color: "var(--forest)" }}>−$164</td>
                    <td>Jun 16, 2026</td>
                  </tr>
                  <tr style={{ borderTop: "2px solid var(--ink)" }}>
                    <td><b>Total</b></td>
                    <td style={{ color: "var(--faint)" }}>4 contractors</td>
                    <td className="r amt">$2,457</td>
                    <td className="r amt">$3,388</td>
                    <td className="r amt">$7,372</td>
                    <td className="r amt" style={{ color: "var(--clay)" }}><b>+$3,984</b></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cap">
              Full history for context: Sydney <b>$12,506</b> across 5 payments · Ravil <b>$12,275</b> / 20 payments · Elaine <b>$6,875</b> / 16 payments ·
              Sohel <b>$138</b> / 2 payments. Ravil and Elaine invoice fairly regularly and are roughly current;{" "}
              <b style={{ color: "var(--clay)" }}>Sydney is the problem</b> — large, infrequent catch-ups (e.g. $6,150 on Feb 2) then long silences.
            </div>
          </div>

          <div className="callout clay" style={{ marginTop: 22 }}>
            <div className="fig">
              ~$5,650
              <small>
                estimated owed to Sydney Finn
                <br />
                (≈4 months unbilled since Feb 20)
              </small>
            </div>
            <p>
              <b>The books can't be trusted until contractor invoices catch up.</b> Sydney Finn delivers the Yogen Fruz work (~$1,413/mo) but hasn't invoiced
              since February, so a payable of roughly <b>$5,650</b> is quietly building. Because the business kept drawing while this cost sat unpaid, the
              family pulled out <b>~$1,000/mo more than Lumin8 actually earns</b> — exactly the kind of gap that triggered May's NSF bounce, overdraft
              interest and returned-cheque fee. The fix is operational: get every contractor (and Dorit) onto a fixed monthly invoice date, reserve Sydney's
              ~$1,400/mo as it's earned, and only then is the take-home number reliable.
            </p>
          </div>
        </section>

        {/* 4 */}
        <section>
          <div className="sec-head">
            <span className="sec-num">04</span>
            <h2>The new AI-website line of business</h2>
          </div>
          <p className="sec-sub">
            Dan asked to size this emerging stream. It's small but real, climbing, and structurally different from the agency retainers — many small clients
            paying ~$500 one-time fees, with the best ones (like Shannon) expanding into repeat work.
          </p>

          <div className="stats">
            <div className="stat in">
              <div className="lab">Booked in last 3 months</div>
              <div className="big num">$4,068</div>
              <div className="sub">≈ $1,356/mo · Shannon $2,825 + one-offs $1,243</div>
            </div>
            <div className="stat">
              <div className="lab">Total since launch</div>
              <div className="big num">$7,718</div>
              <div className="sub">10 payments across 5 clients, Jan–Jun 2026</div>
            </div>
            <div className="stat net">
              <div className="lab">Share of business revenue</div>
              <div className="big num">~17%</div>
              <div className="sub">of last-quarter billings — and the only growing line</div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 22 }}>
            <LRow name="Shannon Leroux" sub="3 sites · social plan · e-commerce" width="100%" color="var(--brass)" amt="$3,842" payments="5 payments" />
            <LRow name="Jonathan Karten" sub="website build (Jan)" width="46%" color="var(--brass)" amt="$1,785" payments="2 payments" />
            <LRow name="Hannah / Meytal Daniels" sub="website (Jan)" width="22%" color="var(--brass-soft)" amt="$848" payments="1 payment" />
            <LRow name="Randi Yaffa" sub="website (Apr)" width="18%" color="var(--brass-soft)" amt="$678" payments="1 payment" />
            <LRow name="Adam Soda" sub="website (Apr)" width="15%" color="var(--brass-soft)" amt="$565" payments="1 payment" />
          </div>
          <p className="cap">
            The growth play, visible in the data: Shannon alone is worth as much as the four one-off clients combined — because she came back four times.
            The infrastructure is already paid for (DigitalOcean, Cloudflare, SiteGround/BlueHost hosting, Canva, Zapier, Claude all show up in the Visa).
            The lever is converting more $500 builds into Shannon-style repeat relationships, and adding a small monthly hosting/maintenance retainer to
            turn one-time fees into recurring revenue.
          </p>
        </section>

        {/* 5 */}
        <section>
          <div className="sec-head">
            <span className="sec-num">05</span>
            <h2>How the income picture changed — a timeline</h2>
          </div>
          <p className="sec-sub">
            The last twelve months reshaped where the family's money comes from: Dan traded self-employment for a salary, and the business shed most of its
            roster down to two anchor clients.
          </p>

          <div className="tl">
            <Ev cls="bad" when="SEP 2025" what="Sofiya Gendelman winds down" why="A recurring ~$2,200/mo client makes her last payment — the first of several departures." />
            <Ev cls="good" when="JAN 5, 2026" what="Dan starts full-time at TBDC" why="$135K salary begins. Stable, taxed-at-source employment income replaces Dan's freelance billings." />
            <Ev cls="bad" when="JAN 2026" what="Toronto Zionist Council (Camp Shalom) ends" why="Seasonal camp engagement makes its final payment. Website side-line begins (Jonathan Karten, Hannah Daniels)." />
            <Ev cls="bad" when="FEB 2026" what="Lewis Legal terminates" why="Dan's largest personal client ends as he goes full-time at TBDC. Final payment $5,650 (Feb 6). Shannon Leroux begins — the anchor of the new web business." />
            <Ev cls="" when="FEB 2026" what="Dan receives a $10,000 payroll advance" why="Interest-free; repaid at $384.62 per cheque over a year (~$6,150 still outstanding). A one-time cash inflow, not income." />
            <Ev cls="bad" when="APR 10, 2026" what='Garage Door Beasts makes its final payment' why={<>Paid as "Dorit Dari" ($2,486). With this gone, the business is down to two recurring clients: <b>Acronym + Yogen Fruz</b>.</>} />
            <Ev cls="good" when="APR–MAY 2026" what="Website line of business gains traction" why="Shannon expands to a 3rd site + e-commerce + social; Randi Yaffa and Adam Soda added. Stream reaches ~$1,350/mo." />
            <Ev cls="" when="FEB–JUN 2026" what="Sydney Finn invoicing lapses" why="No Yogen Fruz delivery cost booked since Feb 20 — a ~$1,400/mo liability accruing against the Yogen revenue." />
            <Ev cls="future" when="LATER 2026" what="Dan's year-end performance bonus" why="Up to $15K per contract (~$8,500 net after marginal tax). Upside, not yet banked. EI/CPP also max out mid-year, lifting later cheques ~$385 each." />
          </div>
        </section>

        {/* 6 */}
        <section>
          <div className="sec-head">
            <span className="sec-num">06</span>
            <h2>What we need to confirm before the numbers are trustworthy</h2>
          </div>
          <p className="sec-sub">
            The bank feed shows cash <i>out</i>, never invoices. To turn the estimates above into real numbers, we need answers to these. Split into
            questions for Dorit (the arrangements) and for the bookkeeper (the ledger).
          </p>

          <div className="grid2 even">
            <div className="card">
              <h4 style={{ fontFamily: "'Space Grotesk'", fontSize: 15, color: "var(--plum)", marginBottom: 6 }}>
                Ask Dorit — the contractor arrangements
              </h4>
              <div className="qa">
                <div className="q"><b>Sydney Finn (Finn Digital).</b> Is she a flat monthly fee, hourly, or a % of Yogen Fruz? What exact months has she been paid for, and how many months are currently un-invoiced? Confirm the ~$1,413/mo estimate and the total she's owed today.</div>
                <div className="q"><b>Does Sydney do anything besides Yogen Fruz?</b> Any other clients or the website work?</div>
                <div className="q"><b>Ravil Muldagaliyev.</b> What's his role and which client/work does he support? Is the ~$500/mo a retainer or per-task? Any unbilled balance?</div>
                <div className="q"><b>Sohel Rana.</b> Who is this and what do they do? (Small amounts via Wise suggest an overseas micro-contractor.) Ongoing? Expected monthly cost?</div>
                <div className="q"><b>Any other contractors or vendors</b> who invoice irregularly and may have unpaid balances we can't see in the bank feed?</div>
                <div className="q"><b>Does Dorit invoice Lumin8 for her own time</b> (e.g. the Acronym hours), or only take dividends? Is there a Dorit payable building up too?</div>
                <div className="q"><b>Website line of business:</b> are there per-project costs (designers, developers, stock assets) that should be netted against the ~$500 builds?</div>
              </div>
            </div>
            <div className="card">
              <h4 style={{ fontFamily: "'Space Grotesk'", fontSize: 15, color: "var(--steel)", marginBottom: 6 }}>
                Ask the bookkeeper — the ledger
              </h4>
              <div className="qa">
                <div className="q"><b>Total accounts payable today.</b> What is the full balance of unpaid/unrecorded invoices as of now — the single most important number for trusting take-home.</div>
                <div className="q"><b>Accounts receivable.</b> Is any Acronym/Yogen Fruz/website revenue billed-but-unpaid? That would partly offset the payables.</div>
                <div className="q"><b>HST.</b> What's the current HST balance owing (collected minus input tax credits), and when is the next remittance due?</div>
                <div className="q"><b>Corporate income tax.</b> Are installments owing, and is there a reserve for tax on dividends drawn (none is withheld at source)?</div>
                <div className="q"><b>Lumpy / annual costs</b> not visible in the 3-month window — year-end accounting fees, annual software renewals, corporate filing, insurance.</div>
                <div className="q"><b>Elaine's own arrangement.</b> Flat monthly or hourly, and is she current?</div>
                <div className="q"><b>Is Sydney Finn's cost accrued in the books</b> as a payable, or only recorded when paid? (If the latter, every prior month's profit is overstated.)</div>
              </div>
            </div>
          </div>
          <p className="cap">
            Once these are answered we can lock the contractor run-rates, net the website revenue, and produce a take-home figure for Dorit/Lumin8 that's
            reliable rather than estimated — and decide a sustainable monthly draw that doesn't outrun what the business earns.
          </p>
        </section>

        <footer>
          <b>Method &amp; caveats.</b> Income figures cover Apr–Jun 2026 ("last 3 months"). Dan's pay is net of income tax, EI/CPP and the payroll-advance
          repayment. The business P&amp;L is shown on an <b>accrual basis</b> — costs are counted when the work is done, not when paid — because Dorit and
          the contractors invoice late. Contractor run-rates (Sydney ~$1,413/mo, Ravil ~$614/mo, Sohel ~$69/mo, Elaine ~$362/mo) are{" "}
          <b>estimates derived from each person's full payment history, not confirmed invoices</b>, and should be validated via §6 before being relied on.
          Family-account totals are the actual deposits in the TD chequing export (Dan's "TORONTO BUSINES PAY" $3,228.15 bi-weekly, and the "TFR-FR 5260024"
          dividend transfers from Lumin8). Business figures are reconciled from the QuickBooks chequing + Visa exports; the $2,135 NSF payment-reversal and
          ~$139 of personal card items are excluded, and Visa card-payment transfers are netted against actual purchases to avoid double-counting.
          "Acronym" combines payments labelled <b>Acronym Solutions Inc.</b> and <b>Bluelime Technical Services Inc.</b> "Lewis Legal" is the client
          formerly shown as Alana Weisberg (Alana handled their payroll; payments arrive as "Lewis &amp; Assoc"). Acronym billings are hour-based and vary
          month to month; the ~$3,250/mo figure is the Jan–Jun 2026 average. The year-end bonus and its ~$8,500 net are illustrative and depend on
          performance. This is a read of your own statements, not financial or tax advice — confirm the dividend/personal-tax reserve with your accountant.
          <span className="tag-pill">Updated Jun 29, 2026</span>
        </footer>
      </div>
    </div>
  );
}

function PLRow({ name, width, color, amount, tot }: { name: React.ReactNode; width: string; color: string; amount: string; tot?: boolean }) {
  return (
    <div className={"plrow" + (tot ? " tot" : "")}>
      <div className="pnm">{name}</div>
      <div className="plbar">
        <span style={{ width, background: color }}>{amount}</span>
      </div>
    </div>
  );
}

function LRow({ name, sub, width, color, amt, payments }: { name: string; sub: string; width: string; color: string; amt: string; payments: string }) {
  return (
    <div className="lrow">
      <div className="nm">
        {name}
        <small>{sub}</small>
      </div>
      <div className="track">
        <div className="fill" style={{ width, background: color }} />
      </div>
      <div className="amt">
        {amt}
        <small>{payments}</small>
      </div>
    </div>
  );
}

function Ev({ cls, when, what, why }: { cls: string; when: string; what: string; why: React.ReactNode }) {
  return (
    <div className={"ev " + cls}>
      <div className="when">{when}</div>
      <div className="what">{what}</div>
      <div className="why">{why}</div>
    </div>
  );
}
