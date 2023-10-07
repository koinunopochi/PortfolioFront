const areLinksSame = (prevDoc: Document, currentDoc: Document): boolean => {
  const prevLinks = filterSpecificLinks(prevDoc);
  const currentLinks = filterSpecificLinks(currentDoc);

  console.log('prevLinks', prevLinks);
  console.log('currentLinks', currentLinks);

  // まず、リンクの数が同じかチェック
  if (prevLinks.length !== currentLinks.length) {
    return false;
  }

  // 各リンクが一致しているか確認
  for (let i = 0; i < prevLinks.length; i++) {
    if (
      prevLinks[i].getAttribute('href') !==
        currentLinks[i].getAttribute('href') ||
      prevLinks[i].textContent !== currentLinks[i].textContent
    ) {
      return false;
    }
  }

  return true;
};

export { areLinksSame };

const filterSpecificLinks = (doc: Document) => {
  // docから<a>タグをクエリ
  const links = doc.querySelectorAll('a');

  // linkText と linkHref が一致する<a>タグだけをフィルタリング
  return Array.from(links).filter((link) => {
    // リンクが非表示であるか確認
    const computedStyle = getComputedStyle(link);
    if (
      computedStyle.display === 'none' ||
      link.classList.contains('same-link')
    ) {
      return false;
    }

    const linkText = link.textContent ? link.textContent.trim() : '';
    const hrefAttribute = link.getAttribute('href');
    const linkHref = hrefAttribute ? hrefAttribute.trim() : '';
    return linkText && linkHref && linkText === linkHref;
  });
};



async function getTitleAndImageFromLink(linkElement: HTMLAnchorElement) {
  // URLの取得
  const url = linkElement.getAttribute('href');

  if (!url) {
    throw new Error('Link element does not have a valid href attribute');
  }

  // Webページのフェッチ
  const response = await fetch(url);
  const htmlText = await response.text();

  // ページ内容のパース
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');

  // <title>タグの内容の取得
  const titleElement = doc.querySelector('title');
  if (!titleElement) {
    throw new Error('Could not find title element in the fetched page');
  }

  // <img>タグのURLを取得
  const imageElement = doc.querySelector('img');
  const imageUrl = imageElement ? imageElement.getAttribute('src') : null;

  return {
    title: titleElement.textContent,
    imageUrl: imageUrl,
  };
}

const applyTitleToFilteredLinks = async (doc: Document) => {
  const filteredLinks = filterSpecificLinks(doc);

  for (let link of filteredLinks) {
    try {
      const { title, imageUrl } = await getTitleAndImageFromLink(link);

      // もともとのリンクを非表示にする
      link.style.display = 'none'; // この行を追加

      // 新しいリンク要素を作成
      const newLink = document.createElement('a');
      newLink.setAttribute('href', link.getAttribute('href') || '#');

      const linkContent = document.createElement('div');
      linkContent.classList.add('dynamic-link');

      const titleElement = document.createElement('div');
      titleElement.textContent = title;
      linkContent.appendChild(titleElement);

      const urlElement = document.createElement('span');
      urlElement.textContent = link.getAttribute('href');
      linkContent.appendChild(urlElement);

      newLink.appendChild(linkContent);

      if (imageUrl) {
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', imageUrl);
        imgElement.setAttribute('alt', '');
        imgElement.setAttribute('height', '110');
        imgElement.setAttribute('width', '220');
        newLink.appendChild(imgElement);
      }

      if (link.parentElement) {
        link.parentElement.insertBefore(newLink, link);
      }

      console.log(`URL: ${link.getAttribute('href')}, Title: ${title}`);
    } catch (error: any) {
      console.error(
        `Error fetching details for link ${link.getAttribute('href')}: ${
          error.message
        }`
      );
    }
  }
};

const getLinksFromHTML = async (htmlText: string, className: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');

  // 特定の条件を満たすリンクのみを取得
  const filteredLinks = filterSpecificLinks(doc);

  // 取得したリンクにタイトルを追加
  // await applyTitleToFilteredLinks(doc); // ここでawaitを使用して完了を待ちます

  // 取得したリンクに className を追加
  filteredLinks.forEach((link) => {
    link.classList.add(className);
  });

  // 変更されたHTMLを文字列として取得
  return doc.body.innerHTML;
};

export default getLinksFromHTML;
