
const searchInput = document.getElementById("searchInput");
const businessCards = document.querySelectorAll(".business-card");
const categoryButtons = document.querySelectorAll(".category");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "all";

function filterBusinesses() {
  const searchTerm = searchInput.value
    .trim()
    .toLocaleLowerCase("fa");

  let visibleCount = 0;

  businessCards.forEach((card) => {
    const title = card.querySelector("h3").textContent
      .toLocaleLowerCase("fa");

    const description = card.querySelector("p").textContent
      .toLocaleLowerCase("fa");

    const type = card.querySelector(".business-type").textContent
      .toLocaleLowerCase("fa");

    const matchesSearch =
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      type.includes(searchTerm);

    const matchesCategory =
      selectedCategory === "all" ||
      card.dataset.category === selectedCategory;

    const isVisible = matchesSearch && matchesCategory;

    card.hidden = !isVisible;

    if (isVisible) {
      visibleCount++;
    }
  });

  emptyMessage.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterBusinesses);

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    categoryButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    filterBusinesses();
  });
});
