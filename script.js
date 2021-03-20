const openMessages = document.querySelector('.widget-open');

function openWidget() {
  openMessages.classList.add('active');
  createMessage()
}

function closeWidget() {
  openMessages.classList.remove('active')
}

const widgetBtn = document.querySelector('.widget-icon');
const widgetCloseBtn = document.querySelector('.widget-open__btn')

widgetBtn.addEventListener('click', openWidget);
widgetCloseBtn.addEventListener('click', closeWidget)


async function createMessage() {
  let response = await fetch('https://api.mediastack.com/v1/news?access_key=4539ab47c8573484130c5d9941bead2d&countries=gb');

  if (response.ok) {
    let json = await response.json();
    let data = json.data;

    for (let i = 0; i < 10; i++) {
      const item = document.createElement('li');
      item.classList.add('message-item');

      const title = document.createElement('p');
      title.classList.add('message-title');
      title.innerHTML = data[i].title;

      const author = document.createElement('p');
      author.classList.add('message-author');
      if (data[i].author === null) {
        author.innerHTML = 'Author unknown';
      } else {
        author.innerHTML = data[i].author;
      }

      const time = document.createElement('time');
      time.classList.add('message-date');
      let elemTime = data[i].published_at.substring(11, 16);
      let day = data[i].published_at.substring(8, 10);
      let month = data[i].published_at.substring(5, 7);
      let year = data[i].published_at.substring(0, 4);
      time.innerHTML = `${day}.${month}.${year} ${elemTime}`;

      const link = document.createElement('a');
      link.classList.add('message-link');
      link.innerHTML = "Read more...";
      link.setAttribute('href', `${data[i].url}`);

      const messageList = document.querySelector('.messange-list')
      messageList.append(item);
      item.append(title);
      item.append(author);
      item.append(time);
      item.append(link);
    }

  } else {
    console.log(response.status);
  }
}
