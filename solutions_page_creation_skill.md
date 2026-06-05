# Skill: Creating Multi-Container Solution Pages

This skill outlines how to replicate the multi-container scrolling catalog layout (currently implemented on the **Refinery & Terminal Automation** page) for future solutions and products pages.

---

## 📋 Layout Design Pattern

The page design relies on:
1. **CatalogHero**: Banner component rendered at the very top of the page.
2. **Catalog Detail Sections**: Sequential section blocks styled with a clean top-level division summary header (`.catalog-detail-summary`).
3. **DetailBrowser Component**: The reusable sidebar-and-panel container [components/detail-browser.js](file:///Users/sohambhutkar/projects/Clients/Orvion-IntelliAct/components/detail-browser.js) that handles list rendering, title-based filtering, and panel scroll heights.
4. **CTA block**: A unified call-to-action block at the bottom of the page.

---

## 🛠️ Step-by-Step Implementation Guide

### Step 1: Update the Catalog Data
Add the sections for the new page in your data file (e.g., [lib/solutions-data.js](file:///Users/sohambhutkar/projects/Clients/Orvion-IntelliAct/lib/solutions-data.js) or [lib/products-data.js](file:///Users/sohambhutkar/projects/Clients/Orvion-IntelliAct/lib/products-data.js)).

Group your sections in a flat array, ordered chronologically by how they will be split:
```javascript
export const solutions = [
  {
    "slug": "new-page-slug",
    "title": "New Solution Title",
    "image": "/images/banner_image.png",
    "description": "Short summary description.",
    "content": {
      "sections": [
        // --- Group 1 Sections (Index 0 to N-1) ---
        {
          "title": "First Group Element 1",
          "text": "Detailed body copy...",
          "items": ["Bullet Point 1", "Bullet Point 2"],
          "image": "/images/image1.png"
        },
        // --- Group 2 Sections (Index N to end) ---
        {
          "title": "Second Group Element 1",
          "text": "Detailed body copy...",
          "items": ["Bullet Point 3", "Bullet Point 4"],
          "image": "/images/image2.png"
        }
      ]
    }
  }
];
```

---

### Step 2: Configure Route Page
Open [app/solutions/[slug]/page.js](file:///Users/sohambhutkar/projects/Clients/Orvion-IntelliAct/app/solutions/[slug]/page.js) (or `app/products/[slug]/page.js` for products).

1. **Import Reusable Components**:
   Ensure both `Link` and the `DetailBrowser` component are imported at the top:
   ```javascript
   import Link from "next/link";
   import { DetailBrowser } from "../../../components/detail-browser";
   ```

2. **Intercept Slug & Slice Arrays**:
   Calculate conditional flags and split the flat sections list into separate arrays using JavaScript's `.slice()` method:
   ```javascript
   const isNewPage = slug === "new-page-slug";
   const firstGroupSections = isNewPage ? solution.content?.sections?.slice(0, 12) : [];
   const secondGroupSections = isNewPage ? solution.content?.sections?.slice(12) : [];
   ```

3. **Render Dual Containers conditionally**:
   Wrap your multi-container render layout in a ternary check inside the JSX block:
   ```javascript
   {isNewPage ? (
     <>
       {/* First Container (Division 01) */}
       <section className="section catalog-detail-section" style={{ paddingBottom: 0 }}>
         <div className="shell">
           <div className="catalog-detail-summary gs-reveal" style={{ marginBottom: "32px" }}>
             <div>
               <span className="accent-bar" />
               <p className="eyebrow">Division 01</p>
               <h2>First Container Header</h2>
             </div>
             <p>Short paragraph details of division 1 (aligns to vertical center of the title).</p>
           </div>

           <DetailBrowser
             sections={firstGroupSections}
             kind="Solution"
             searchPlaceholder="Search first container..."
             panelLabel="Scope and delivery"
             itemLabel="Part"
             listHeading="Scope list heading"
           />
         </div>
       </section>

       {/* Second Container (Division 02) */}
       <section className="section catalog-detail-section" style={{ paddingBottom: 0 }}>
         <div className="shell">
           <div className="catalog-detail-summary gs-reveal" style={{ marginBottom: "32px" }}>
             <div>
               <span className="accent-bar" />
               <p className="eyebrow">Division 02</p>
               <h2>Second Container Header</h2>
             </div>
             <p>Short paragraph details of division 2 (aligns to vertical center of the title).</p>
           </div>

           <DetailBrowser
             sections={secondGroupSections}
             kind="Solution"
             searchPlaceholder="Search second container..."
             panelLabel="Scope and delivery"
             itemLabel="Part"
             listHeading="Scope list heading"
           />
         </div>
       </section>

       {/* Bottom CTA Block */}
       <section className="section catalog-detail-cta">
         <div className="shell section-center gs-reveal">
           <span className="accent-bar center" />
           <h2>Ready to scope this solution?</h2>
           <p className="cta-copy">Discuss how New Solution Title can be shaped for your process.</p>
           <div className="hero-actions center">
             <Link href="/contact" className="button primary">
               Request Consultation
             </Link>
             <Link href="/solutions" className="button secondary">
               All Solutions
             </Link>
           </div>
         </div>
       </section>
     </>
   ) : (
     // Render default DetailContentBrowser wrapper fallback ...
   )}
   ```

---

### Step 3: Run Validation Build
Run test cases and trigger a production build locally to ensure there are no TypeScript/compilation errors:
```bash
npm test
npm run build
```
