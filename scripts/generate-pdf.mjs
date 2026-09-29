import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const root = process.cwd();
const sourcePath = path.join(root, "docs", "live-coding-guide.md");
const outputPath = path.join(root, "docs", "mongodb-live-coding-guide.pdf");
const markdown = fs.readFileSync(sourcePath, "utf8");
const lines = markdown.split(/\r?\n/);

const document = new PDFDocument({
    size: "A4",
    margins: { top: 48, bottom: 48, left: 48, right: 48 },
    info: {
        Title: "MongoDB Live Coding API Guide",
        Author: "MongoDB Live Coding Project"
    }
});

document.pipe(fs.createWriteStream(outputPath));

const contentWidth = document.page.width - document.page.margins.left - document.page.margins.right;
const normalLineHeight = 15;

function cleanInline(value) {
    return value
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1");
}

function ensureSpace(height) {
    if (document.y + height > document.page.height - document.page.margins.bottom) {
        document.addPage();
    }
}

function renderCodeBlock(codeLines) {
    const lineHeight = 9.5;
    const blockHeight = Math.max(28, codeLines.length * lineHeight + 14);

    ensureSpace(blockHeight + 12);
    const startY = document.y;
    document.save();
    document.roundedRect(document.page.margins.left, startY, contentWidth, blockHeight, 4)
        .fill("#f1f3f5");
    document.restore();

    document.fillColor("#202124")
        .font("Courier")
        .fontSize(7.2)
        .text(codeLines.join("\n"), document.page.margins.left + 8, startY + 7, {
            width: contentWidth - 16,
            lineGap: 1
        });
    document.y = startY + blockHeight + 10;
}

function renderLine(line) {
    if (line.startsWith("# ")) {
        ensureSpace(42);
        document.fillColor("#17324d").font("Helvetica-Bold").fontSize(22)
            .text(cleanInline(line.slice(2)), { paragraphGap: 12 });
        return;
    }

    if (line.startsWith("## ")) {
        ensureSpace(30);
        document.fillColor("#1f5f6b").font("Helvetica-Bold").fontSize(15)
            .text(cleanInline(line.slice(3)), { paragraphGap: 8 });
        return;
    }

    if (line.startsWith("### ")) {
        ensureSpace(24);
        document.fillColor("#274c5e").font("Helvetica-Bold").fontSize(11.5)
            .text(cleanInline(line.slice(4)), { paragraphGap: 5 });
        return;
    }

    if (line.trim() === "") {
        document.y += 5;
        return;
    }

    const listItem = line.match(/^[-*] (.+)$/);
    const text = listItem ? `• ${cleanInline(listItem[1])}` : cleanInline(line);

    ensureSpace(normalLineHeight + 4);
    document.fillColor("#252525").font("Helvetica").fontSize(9.5)
        .text(text, { width: contentWidth, lineGap: 2, paragraphGap: 3 });
}

let inCode = false;
let codeLines = [];

for (const line of lines) {
    if (line.trim().startsWith("```")) {
        if (inCode) {
            renderCodeBlock(codeLines);
            codeLines = [];
        }
        inCode = !inCode;
        continue;
    }

    if (inCode) {
        codeLines.push(line);
    } else {
        renderLine(line);
    }
}

if (inCode && codeLines.length > 0) {
    renderCodeBlock(codeLines);
}

document.end();
console.log(`Created ${outputPath}`);