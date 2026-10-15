/**
 * Filters prompt list by category and search keyword
 * @param {Array} prompts
 * @param {string} [activeCategory='all']
 * @param {string} [searchQuery='']
 * @returns {Array}
 */
export function filterPrompts(prompts, activeCategory = 'all', searchQuery = '') {
  if (!Array.isArray(prompts)) return [];
  const query = (searchQuery || '').trim().toLowerCase();

  return prompts.filter((item) => {
    // 1. Category check
    if (activeCategory && activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }

    // 2. Search query check (title, description, prompt, id, tags, models)
    if (!query) return true;

    const matchTitle = item.title?.toLowerCase().includes(query);
    const matchDesc = item.description?.toLowerCase().includes(query);
    const matchPrompt = item.prompt?.toLowerCase().includes(query);
    const matchId = item.id?.toLowerCase().includes(query);
    const matchTags = Array.isArray(item.tags) && item.tags.some((t) => (t || '').toLowerCase().includes(query));
    const modelsList = item.targetModels || item.models || [];
    const matchModels = Array.isArray(modelsList) && modelsList.some((m) => (m || '').toLowerCase().includes(query));

    return Boolean(matchTitle || matchDesc || matchPrompt || matchId || matchTags || matchModels);
  });
}
