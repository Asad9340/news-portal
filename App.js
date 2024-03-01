const loadData = async () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
  const res = await fetch(
    'https://openapi.programming-hero.com/api/news/categories'
  );
  const data = await res.json();
  const mainData = data.data;
  showBtn(mainData);
};

const showBtn = mainData => {
  const items = mainData.news_category;
  const category = document.getElementById('category');
  items.forEach(element => {
    const div = document.createElement('div');
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
    div.innerHTML = `
    <button onclick="changeCategory('${element.category_id}')" class="px-3 py-2 hover:bg-[#5D5FEF] border border--[#5D5FEF]  hover:text-white rounded-lg outline-none duration-300 font-medium w-full">${element.category_name}</button>
    `;
    category.appendChild(div);
  });
};

const changeCategory = id => {
  showCard(id);
};
const showCard = async id => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${id}`
  );
  const data = await res.json();
  const finalData = data.data;
  displayCard(finalData);
};
const displayCard = finalData => {
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
  finalData.forEach(singleData => {
    const div = document.createElement('div');
    div.innerHTML = `
          <div class="flex flex-col lg:grid gap-4 mt-6 lg:grid-cols-12 bg-[#fff] px-4 md:px-6 lg:px-8 py-6 lg:py-10 rounded-xl">
            <div class="col-span-3">
              <img class="rounded-lg" src="${singleData.image_url}" alt="">
            </div>
            <div class="col-span-9 space-y-3">
              <h2 class="font-bold text-base">${singleData.title}</h2>
              <p>${singleData.details.slice(0, 150)}</p>
              <div class="flex gap-4 justify-between">
                <div class="flex gap-2">
                  <div><img class="w-12 rounded-full" src="${
                    singleData.author.img
                  }" alt=""></div>
                  <div>
                    <h4 class="text-sm font-semibold">${
                      singleData.author.name
                    }</h4>
                    <p class="text-xs">${singleData.author?.published_date?.slice(
                      0,
                      10
                    )}</p>
                  </div>
                </div>
                <div>
                  <p class="font-semibold">Rating <span>${
                    singleData.rating.number
                  }</span></p>
                </div>
                <div><h3>${singleData.rating.badge}</h3></div>
                <div>
                  <h4>icon</h4>
                </div>
              </div>
            </div>
          </div>
    `;
    cardContainer.appendChild(div);
  });
};

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
  console.log('clicked');
  const searchInput = document.getElementById('searchInput').value;
  if (
    searchInput == '01' ||
    searchInput == '02' ||
    searchInput == '03' ||
    searchInput == '04' ||
    searchInput == '05' ||
    searchInput == '06' ||
    searchInput == '07' ||
    searchInput == '08'
  ) {
    showCard(searchInput);
  } else {
    alert('Please enter a valid search input');
  }
});

loadData();
showCard('01');
