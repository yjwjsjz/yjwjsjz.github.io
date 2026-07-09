// 中文按 400 字/分钟,英文按 200 词/分钟估算
export function readingMinutes(body: string): number {
	const cjkChars = (body.match(/[一-鿿]/g) ?? []).length;
	const latinWords = body
		.replace(/[一-鿿]/g, ' ')
		.split(/\s+/)
		.filter(Boolean).length;
	return Math.max(1, Math.round(cjkChars / 400 + latinWords / 200));
}
