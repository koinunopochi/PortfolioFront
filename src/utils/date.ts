const formatJapaneseDate = (isoDate: string | number | Date) => {
  if(!isoDate) return "0000年00月00日  00:00"
  const date = new Date(isoDate);
  // date.setHours(date.getHours() + 9); // +9時間のオフセットを追加
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月は0から始まるため、+1が必要
  const day = date.getDate();
  const hour = String(date.getHours()).padStart(2, '0'); // 2桁になるように0で埋める
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}年${month}月${day}日 ${hour}:${minute}`;
};

export default formatJapaneseDate;
