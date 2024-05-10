<template>
    <div class="dashboard_Container d-flex m-auto position-sticky">

        <div class="text-white d-flex text-box mt-3 mx-5 ">
            <!-- routerlink -->
            <h5>Contact &emsp;|&emsp;</h5>
            <i class='bx bxl-facebook-circle mt-2'>&emsp;</i>

        </div>


        <div class="dashboard_SearchInput d-flex align-items-center justify-content-center position-relative mx-5">

            <button
                class="dashboard_IconInput d-flex align-items-center justify-content-center position-absolute outine-none border-0 rounded-5 bg-transparent ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff"
                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z">
                    </path>
                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M22 22L20 20">
                    </path>
                </svg>
            </button>

            <input placeholder="search.." class="dashboard_InputSearch outline-none rounded-5 bg-secondary text-white align-items-center justify-content-center
    " name="text" type="text">

        </div>


        <div class="dashboard_Header d-flex text-white mt-1 ">
            <!-- <i class='bx bx-user mt-3'>&emsp;</i>
    <router-link v-bind:to="'/'" class="text-decoration-none">
        <h5 class="mt-2 text-white">Login</h5>
    </router-link> -->

            <div class="dropdown pb-4">
                <a href="#" class="d-flex align-items-center text-white text-decoration-none " id="dropdownUser1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg"
                        alt="hugenerd" width="20" height="53" class="rounded-circle">
                </a>
                <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <router-link v-bind:to="'/profile'">
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                    </router-link>

                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <!-- <li><a class="dropdown-item" href="#">Profile</a></li> -->
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>

        </div>

    </div>
</template>

<style>
.dashboard_ContainerFluid {
    height: 370px;

}

.dashboard_Container {
    width: 100%;
    height: 60px;
    background-color: #243673;
}

.dashboard_Header {
    width: 200px;
}

.dashboard_textBox {
    width: 75%;
    overflow: hidden;
    word-wrap: break-word;
    font-size: 16px;

    @media screen and (max-width: 768px) {
        font-size: 12px;
    }

    @media screen and (max-width: 480px) {
        font-size: 12px;
    }
}

.dashboard_InputSearch {

    height: 30px;
    width: 50px;
    padding: 10px;
    transition: .5s ease-in-out;
    box-shadow: 0px 0px 3px #f3f3f3;
    padding-right: 40px;


}

.dashboard_IconInput {
    right: 0px;
    cursor: pointer;
    width: 50px;
    height: 30px;
    pointer-events: painted;
    transition: .2s linear;
}

.dashboard_IconInput:focus~.dashboard_InputSearch,
.dashboard_InputSearch:focus {
    box-shadow: none;
    width: 250px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 3px solid #243673;
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
</style>