
<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: null,
        };
    },
    mounted() {
        this.fetchLoggedInUser();
    },
    methods: {
        async fetchLoggedInUser() {
            try {
                const response = await axios.get('http://localhost:8000/api/student/info'); // Change this URL if needed
                console.log(response.data);
                this.user = response.data;

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        },
        getUserImageURL(user) {
            if (user.image) {
                const imageUrl = `http://localhost:8000/storage/${user.image}`;
                // console.log('Image URL:', imageUrl); // Log the image URL
                return imageUrl;
            } else if (user.image == null) {
                const imageAuto = `https://cdn-icons-png.flaticon.com/512/219/219970.png`;
                // console.log(imageAuto);
                return imageAuto;
            }
        },

    },
};
</script>


<template>
    <div class="h-100" v-if="user">
        <div class="dashboard_Container d-flex m-auto position-sticky">

            <div class="text-white d-flex text-box mt-3 mx-5 ">
                <!-- routerlink -->
                <h5>Contact &emsp;|&emsp;</h5>
                <a href="https://www.facebook.com/itckh/">
                    <i class='bx bxl-facebook-circle mt-2'>&emsp;</i>
                </a>


            </div>


            <div class="dashboard_Header d-flex text-white mt-1 ">

                <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none " id="dropdownUser1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <img :src="getUserImageURL(user)" :alt="user.name" width="20" height="53"
                            class="rounded-circle img-fluid w-25">
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <router-link to="/student/profile" class="text-decoration-none">
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                        </router-link>

                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <a class="dropdown-item cursor-pointer" @click="logout">Sign Out</a>
                        </li>

                    </ul>
                </div>

            </div>

        </div>

        <div class="dashboard_ContainerFluid">
            <div class="row flex-nowwrap ">
                <div class=" col-md-3 col-xl-2 px-sm-2 bg-white" style=" height: 570px; border-right: 1px solid #243673;">
                    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-23text-white">

                        <router-link to="/student/dashboard" class="text-decoration-none">
                            <div
                                class="d-flex align-items-center pb-3 mt-2 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span class="text-center align-items-center m-auto justify-content-center mx-5">
                                    <img src="../../../assets/img/itc_logo.png" alt="" class="img-fluid w-100">
                                </span>
                            </div>
                        </router-link>


                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu">

                            <li class="nav-item mx-4">
                                <router-link :to="{ name: 'studentCourse', params: { userId: user.student_id } }"
                                    class="text-decoration-none"> <a href="#" class="nav-link align-middle px-0">
                                        <i class='mx-2 bx bxs-dashboard bx-rotate-180 fs-5' style='color:#243673'></i>
                                        <span class="ms-1 d-none d-sm-inline text-dark fs-5">Course</span>
                                    </a>
                                </router-link>
                            </li>

                            <li class="nav-item mx-4">
                                <router-link :to="{ name: 'studentMyCourse', params: { userId: user.student_id } }"
                                    class="text-decoration-none"> <a href="#" class="nav-link align-middle px-0">
                                        <i class='mx-2 bx bx-book-open fs-4' style='color:#243673'></i>
                                        <span class="ms-1 d-none d-sm-inline text-dark fs-5">My
                                            Course</span>
                                    </a>
                                </router-link>
                            </li>

                            <li class="nav-item mx-4">
                                <router-link :to="{ name: 'studentDocument', params: { userId: user.student_id } }"
                                    class="text-decoration-none">
                                    <a href="#" class="nav-link px-0 align-middle">
                                        <i class='mx-2 bx bxs-file-doc fs-5' style='color:#243673'></i>
                                        <span class="ms-1 d-none d-sm-inline text-dark fs-5">Document</span></a>
                                </router-link>
                            </li>

                            <li class="nav-item mx-4">
                                <router-link :to="{ name: 'studentProfile', params: { userId: user.student_id } }"
                                    class="text-decoration-none">
                                    <a href="#" class="nav-link px-0 align-middle">
                                        <i class='mx-2 bx bx-user fs-5' style='color:#243673'></i>
                                        <span class="ms-1 d-none d-sm-inline text-dark fs-5">Profile</span></a>
                                </router-link>
                            </li>

                        </ul>
                        <hr>
                    </div>
                </div>

                <div class="col py-3 custom-scrollbar mt-2 justify-content-center">
                    <p class="lead text-center text-muted mb-5 fs-1">Course Enrollment</p>


                    <div class="bulb">
                        <svg width="60pt" height="60pt" version="1.1" viewBox="0 0 1200 1200"
                            xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path
                                    d="m930 552.86h-660c-6.9297 0-13.191-4.168-15.836-10.582-2.6602-6.4102-1.1875-13.777 3.7148-18.684l289.72-289.7c4.1367-4.1367 10.078-5.875 15.836-4.6211 5.707 1.2734 10.379 5.375 12.387 10.883 3.7031 10.164 13.43 16.996 24.176 16.996s20.473-6.832 24.191-17.008c2.0078-5.5078 6.6797-9.5938 12.406-10.863 5.6602-1.2539 11.668 0.48437 15.82 4.6211l289.7 289.7c4.9062 4.9062 6.3789 12.27 3.7148 18.684-2.6445 6.4062-8.9062 10.574-15.836 10.574zm-618.62-34.285h577.23l-245.5-245.51c-11.102 11.469-26.586 18.367-43.109 18.367-16.539 0-32.008-6.8984-43.109-18.348z">
                                </path>
                                <path
                                    d="m986.48 1028.6h-772.97c-23.203 0-42.086-18.883-42.086-42.086v-425.82c0-23.203 18.883-42.09 42.086-42.09h772.97c23.203 0 42.086 18.887 42.086 42.09v425.82c0 23.203-18.883 42.086-42.086 42.086zm-772.97-475.71c-4.3008 0-7.8008 3.5-7.8008 7.8047v425.82c0 4.3008 3.5 7.8008 7.8008 7.8008h772.97c4.3008 0 7.8008-3.5 7.8008-7.8008v-425.82c0-4.3047-3.5-7.8047-7.8008-7.8047z">
                                </path>
                                <path
                                    d="m599.92 935.74c-89.332 0-162-72.758-162-162.17 0-89.414 72.672-162.17 162-162.17 89.414 0 162.17 72.758 162.17 162.17-0.003906 89.414-72.758 162.17-162.17 162.17zm0-290.05c-70.43 0-127.72 57.371-127.72 127.89 0 70.512 57.289 127.89 127.72 127.89 70.512 0 127.89-57.371 127.89-127.89-0.003907-70.516-57.375-127.89-127.89-127.89z">
                                </path>
                                <path
                                    d="m576.71 838.07c-4.5547 0-8.9062-1.8086-12.121-5.0234l-48.113-48.129c-6.6953-6.6953-6.6953-17.543 0-24.242 6.6953-6.6953 17.543-6.6953 24.242 0l35.992 36.012 82.582-82.582c6.6953-6.6953 17.543-6.6953 24.242 0 6.6953 6.6953 6.6953 17.543 0 24.242l-94.703 94.703c-3.2148 3.2109-7.5703 5.0195-12.121 5.0195z">
                                </path>
                                <path
                                    d="m600 291.43c-25.113 0-47.777-15.887-56.383-39.559-2.3633-6.1445-3.6172-13.125-3.6172-20.441 0-33.082 26.918-60 60-60s60 26.918 60 60c0 7.3477-1.2383 14.312-3.6992 20.727-8.5391 23.387-31.207 39.273-56.301 39.273zm0-85.715c-14.18 0-25.715 11.535-25.715 25.715 0 3.0625 0.50391 5.9766 1.4414 8.4375 3.8008 10.445 13.527 17.277 24.273 17.277s20.473-6.832 24.191-17.008c1.0391-2.6992 1.5234-5.6094 1.5234-8.707 0-14.18-11.535-25.715-25.715-25.715z">
                                </path>
                            </g>
                        </svg>
                    </div>



                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss">
// width:1236
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

p {
    font-family: 'Segoe UI', sans-serif;
}

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


/* width */
::-webkit-scrollbar {
    width: 10px;
}



/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
}

.custom-scrollbar {
    width: 100%;
    height: 700px;
    overflow: scroll;
    word-wrap: break-word;
    font-size: 18px;

    @media screen and (max-width: 768px) {
        font-size: 14px;
    }

    @media screen and (max-width: 480px) {
        font-size: 14px;
    }
}

/*Button*/
.card-button {
    padding: .3em;
    cursor: pointer;
    transition: .3s ease-in-out;
}



.bulb svg {
    margin-left: 90%;
    display: block;
    height: 90px;
    transform-origin: center top;
    animation: swing_31 1.3s ease-in-out infinite alternate;
}

@keyframes swing_31 {
    0% {
        transform: rotate(18deg);
    }

    100% {
        transform: rotate(-18deg);
    }
}
</style>

