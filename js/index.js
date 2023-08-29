const handleCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/news/categories")
    const data = await res.json()
    // console.log(data.data);
    const sliceData = data.data.news_category.slice(0,3)
    const tabContainer = document.getElementById("tab-container")
    sliceData.forEach(category => {
        // console.log(data);
        const div = document.createElement("div")
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>
        `
        tabContainer.appendChild(div)
    });
}
const handleLoadNews = async (category_id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    const data = await res.json()
    const cartContainer = document.getElementById("card-container")
    cartContainer.innerHTML = ''
    data.data.forEach(category => {
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
                <figure>
                    <img src="${category.image_url}" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${category.title.slice(0,40)}
                        <div class="badge badge-secondary p-5">${category.rating.badge}</div>
                    </h2>
                    <p>${category.details.slice(0,50)}</p>
                    <h3>${category.total_view? category.total_view : "No Views"}</h3>
                    <div class="card-footer flex justify-between mt-8">
                        <div class="flex">
                            <div>
                                <div class="avatar online">
                                    <div class="w-14 rounded-full">
                                        <img
                                            src="${category.author.img}" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h6>${category.author?.name}</h6>
                                <small>2022-08-24 17:27:34</small>
                            </div>
                        </div>
                        <div class="card-detaild-btn">
                            <button onclick="handleModal('${category._id}')"
                                class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartContainer.appendChild(div)
    });
}

const handleModal = async (news_id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
    const data = await res.json()
    console.log(data.data[0]);
    const modalContainer = document.getElementById("modal-container")
    const div = document.createElement("div")
    div.innerHTML = `
    <dialog id="my_modal_1" class="modal">
                <form method="dialog" class="modal-box">
                    <h3 class="font-bold text-lg">${data.data[0].title}</h3>
                    <p class="py-4">${data.data[0].details}</p>
                    <div class="modal-action">
                        <button class="btn">Close</button>
                    </div>
                </form>
            </dialog>
    `;
    modalContainer.appendChild(div)
    const myModal = document.getElementById("my_modal_1")
    myModal.showModal()
}
handleCategory()