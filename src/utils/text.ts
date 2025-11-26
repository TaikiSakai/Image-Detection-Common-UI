/**
 * 文字列が指定された長さを超える場合、末尾を省略記号で短縮します
 * @param text - 短縮する文字列
 * @param maxLength - 最大文字数（省略記号を含まない）
 * @returns 短縮された文字列
 * @example
 * truncateText('very-long-filename.jpg', 10) // 'very-long-...'
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
};
