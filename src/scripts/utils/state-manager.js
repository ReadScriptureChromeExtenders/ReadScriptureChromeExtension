class StateManager {
  constructor() {
    this.read = [];
    this.watch = [];
    this.pray = [];
    this.planDay = null;
    this.planDayLongForm = '';
    this.chapterId = null;
    this.chapterName = '';
  }

  setPlanData(data) {
    this.planDay = data.day;
    this.planDayLongForm = `Reading for ${data.date}`;
    this.chapterId = data.chapterId;
    
    // Reset arrays
    this.read = [];
    this.watch = [];
    this.pray = [];
    
    // Process day contents
    data.dayContents.forEach(content => {
      switch (content.type) {
        case 'read':
          this.read = content.passage;
          this.updateElementText('menu-header-Read-Title', content.passage);
          break;
        case 'watch':
          this.watch.push(content);
          this.updateElementText('menu-header-Watch', 'Watch');
          this.updateElementText('menu-header-Watch-Title', content.passage);
          break;
        case 'pray':
          this.pray = content.passage;
          this.updateElementText('menu-header-Pray-Title', content.passage);
          break;
      }
    });
  }

  setChapterName(name) {
    this.chapterName = name;
    this.updateElementText('chapterName', name);
  }

  updateElementText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    }
  }

  getReadArray() { return this.read; }
  getPrayArray() { return this.pray; }
  getWatchArray() { return this.watch; }
  getPlanDay() { return this.planDay; }
  getPlanDayLongForm() { return this.planDayLongForm; }
  getChapterName() { return this.chapterName; }
  getChapterId() { return this.chapterId; }
}

export const stateManager = new StateManager(); 