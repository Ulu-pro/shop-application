const openTab = (identifier) => {
  for (const tabContent of document.querySelectorAll('.tab-content')) {
    if (tabContent.classList.contains('active')) {
      tabContent.classList.remove('active');
    }
  }

  const currentTab = document.getElementById(identifier);
  currentTab.classList.add('active');
}