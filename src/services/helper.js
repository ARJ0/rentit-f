export const setlocalStorage = (name, data) => {
    localStorage.setItem(name, data)
}

export const getlocalStorage = (name) => {
    const data = JSON.parse(localStorage.getItem(`${name}`));
    return(data ?? {})
}

export const accountType = () => {
    const getUserData = getlocalStorage("loggedUser");
    return({
        company: getUserData.account_type === "company" ? true : false,
        user: getUserData.account_type === "user" ? true : false
    })
}
export const equipmentCategoriesTypeName = {
    heavy_machinery:"Heavy Machinery",
    tools:"Tools",
    construction: "Construction",
    earth_movers:"Earth Movers",
    snow_removal:"Snow removal"
}
export const equipmentCategories = [
    { label: "Heavy Machinery", value: "heavy_machinery" },
    { label: "Tools", value: "tools" },
    { label: "Construction", value: "construction" },
    { label: "Earth Movers", value: "earth_movers" },
    { label: "Snow Removal", value: "snow_removal" },
  ];