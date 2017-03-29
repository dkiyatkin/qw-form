export default function getProfileFormsItem (itemType) {
  const cache = localStorage.getItem(`rrf.profile.${itemType}`)
  if (cache) return JSON.parse(cache)
  return {}
}
