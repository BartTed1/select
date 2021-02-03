window.addEventListener("load", () => {
});
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const selectInputs = $$("select");

$("title").insertAdjacentHTML("beforebegin", `
    <link rel="stylesheet" href="data:text/css;base64,LnNlbGVjdCwub3B0aW9ue2N1cnNvcjpwb2ludGVyO30ubGlzdHtvdmVyZmxvdy15OiBhdXRvOyBwb3NpdGlvbjogYWJzb2x1dGU7IHdpZHRoOiAxMDAlO3otaW5kZXg6OTk7bWF4LWhlaWdodDozMDBweDtib3JkZXI6MXB4IHNvbGlkICNFMEUwRTA7fS5zZWxlY3RXcmFwcGVye3Bvc2l0aW9uOnJlbGF0aXZlO3VzZXItc2VsZWN0Om5vbmU7fS5oaWRkZW57ZGlzcGxheTpub25lO30uc2VsZWN0e3Bvc2l0aW9uOiByZWxhdGl2ZTtwYWRkaW5nOiA3cHggMjlweCA3cHggMTRweDtiYWNrZ3JvdW5kLWNvbG9yOiAjRkFGQUZBO2JvcmRlcjogMXB4IHNvbGlkICNFMEUwRTA7ZGlzcGxheTogaW5saW5lLWJsb2NrO30uc2VsZWN0OjphZnRlcntjb250ZW50OiAiIOKWvCI7Zm9udC1zaXplOiA1OSU7cG9zaXRpb246IGFic29sdXRlO3JpZ2h0OiAxMHB4O21hcmdpbi10b3A6IDVweDttYXJnaW4tbGVmdDogMTBweDt9Lm9wdGlvbntwYWRkaW5nOiA3cHggMTRweDtiYWNrZ3JvdW5kLWNvbG9yOiAjRkFGQUZBO2JvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTBFMEUwO30uc2VsZWN0ZWR7YmFja2dyb3VuZC1jb2xvcjojNDJBNUY1O30uZGlzYWJsZWR7Y29sb3I6I0JEQkRCRDtjdXJzb3I6ZGVmYXVsdDt9">
`);
/*
.select,.option{cursor:pointer;}.list{overflow-y: auto; position: absolute; width: 100%;z-index:99;max-height:300px;border:1px solid #E0E0E0;}.selectWrapper{position:relative;user-select:none;}.hidden{display:none;}.select{position: relative;padding: 7px 29px 7px 14px;background-color: #FAFAFA;border: 1px solid #E0E0E0;display: inline-block;}.select::after{content: " ▼";font-size: 59%;position: absolute;right: 10px;margin-top: 5px;margin-left: 10px;}.option{padding: 7px 14px;background-color: #FAFAFA;border-bottom: 1px solid #E0E0E0;}.selected{background-color:#42A5F5;}.disabled{color:#BDBDBD;cursor:default;}
*/

selectInputs.forEach(select => {
    select.hidden = true;
    const options = select.options;
    const selectWrapper = document.createElement("div");
    selectWrapper.className = "selectWrapper";
    selectWrapper.id = select.id;
    selectWrapper.innerHTML = `
    <div class="select" tabindex=0 id="${ select.id}-select" data-value="${select.value}">${select.options[select.selectedIndex].innerHTML}</div>
    <div class="list hidden"></div>
`;
    select.insertAdjacentElement("afterend", selectWrapper);
    let selectOptionsWrapper = $$(".list")[$$(".list").length - 1];
    for (let i = 0; i < options.length; i++) {
        selectOptionsWrapper.innerHTML += `
        <div tabindex=0 class="option ${ select.value == options[i].value ? "selected" : ""} ${options[i].disabled ? "disabled" : ""}" ${options[i].hidden ? "hidden" : ""} data-value="${options[i].value}">${options[i].innerHTML}</div>
    `;
    }
});
$$(".option").forEach(element => {
    element.addEventListener("click", () => {
        $$(".option").forEach(element => { element.classList.remove("selected") });
        if (element.classList[1] == "disabled") return;
        element.classList.toggle("selected");
        element.parentElement.classList.toggle("hidden");
        let select = element.parentElement.parentElement.children[0];
        select.innerHTML = element.innerHTML;
        select.setAttribute("data-value", element.getAttribute("data-value"));
        selectUpdate(select);
    });
    element.addEventListener("keydown", (event) => {
        if (event.key == "Enter") element.click();
        else if (event.key == "ArrowUp") {
            event.preventDefault();
            let previous = element.previousSibling.previousSibling;
            if (previous == null) return;
            else previous.focus();
        }
        else if (event.key == "ArrowDown") {
            event.preventDefault();
            let next = element.nextSibling.nextSibling;
            if (next == null) return;
            else next.focus();
        }
    });
});
// (un)hide option list after click on .select
$$(".select").forEach(element => {
    element.addEventListener("click", () => {
        element.parentElement.children[1].classList.toggle("hidden");
    });
    element.addEventListener("keydown", (event) => {
        $$(".selectWrapper").forEach(item => {
            item.addEventListener("keydown", (event) => {
                if (event.key == "Escape") element.click();
            });
        });
        if (event.key == "Enter") element.click();
    });
});
const selectWrapper = $$(".selectWrapper");
selectWrapper.forEach(element => {
    element.style.width = element.children[0].offsetWidth + "px";
});
// click anywhere to hide option list
document.body.addEventListener("click", () => {
    $$(".selectWrapper").forEach(element => {
        element.addEventListener("click", (event) => {
            event.stopPropagation();
        })
    })
    $$(".list").forEach(element => {
        element.classList.add("hidden");
    });
});
function selectUpdate(element) {
    let id = element.id.slice(0, -7);
    document.getElementById(id).value = element.getAttribute("data-value");
    document.getElementById(id).selected = element.getAttribute("data-value");
}
// init
$(".selectWrapper").click();