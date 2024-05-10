

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: null,
            programs: null,
            courses: [],
            selectedProgram: null,
            selectedCourses: [],
            enrollmentMessage: null, // Message to display after enrollment


        };
    },
    mounted() {
        this.fetchLoggedInUser();
        // this.fetchProgramUser();
    },

    created() {
        this.fetchCourseUser();

    },

    methods: {
        getUserImageURL(user) {
            if (user.image) {
                const imageUrl = `http://localhost:8000/storage/${user.image}`;
                return imageUrl;
            } else {
                const imageAuto =
                    'https://cdn-icons-png.flaticon.com/512/219/219970.png';
                return imageAuto;
            }
        },

        logout() {
            axios.post('http://localhost:8000/api/logout')
                .then(response => {
                    console.log(response.data);
                    this.$store.commit('setUser', null)
                    this.$store.commit('setToken', null)
                    this.$store.commit('setRole', null)
                    this.$router.push('/login');
                })
                .catch(error => {
                    console.log(error)
                });
        },


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

        // async fetchProgramUser() {
        //     try {
        //         const response2 = await axios.get('http://localhost:8000/api/student/showProgram'); // Change this URL if needed
        //         console.log(response2.data);
        //         this.programs = response2.data;

        //     } catch (error) {
        //         console.error('Error fetching user:', error);
        //     }
        // },

        fetchCourseUser() {
            const programId = this.$route.params.programId;
            console.log('Program ID:', programId); // Check the programId


            axios.get(`http://localhost:8000/api/student/showProgram/${programId}/courses`)
                .then(response3 => {
                    this.courses = response3.data;
                    // this.selectedProgram = this.programs.find(program => program.id === programId);
                    // console.log(response3.data);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error);
                });

        },

        fetchInfoUser() {
            const userId = this.$route.params.userId;
            console.log('User ID:', userId); // Check the student_id

            axios.get(`http://localhost:8000/api/student/info/${userId}`)
                .then(response3 => {
                    this.user = response3.data[0];
                    this.programs = response3.data[0];
                    this.courses = response3.data[0];
                    this.student_details = response3.data[0];
                    console.log(response3.data);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error);
                });


        },



    },
};
</script>

<template>
    <div class="h-100" v-if="user">


        <div class="dashboard_ContainerFluid">
            <div class="row flex-nowrap">
                <div class=" col-md-3 col-xl-2 px-sm-2 min-vh-100 " style=" background-color: #233673;">
                    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-23text-white">

                        <router-link to="/student/dashboard" class="text-decoration-none">
                            <div
                                class="d-flex align-items-center pb-3 mt-2 mb-md-0 me-md-auto text-white text-decoration-none">
                                <div class="d-flex text-center align-items-center m-auto justify-content-center mx-5">
                                    <img src="../../../assets/img/GS_logo.png" alt="" class="img-fluid "
                                        style="width:6rem;">
                                    <img src="../../../assets/img/ITC_logo.png" alt="" class="img-fluid"
                                        style="width:6rem;">
                                </div>
                            </div>
                        </router-link>


                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu">

                            <li class="nav-item mx-4">
                                <router-link :to="{ name: 'studentCourse', params: { userId: user.student_id } }"
                                    class="text-decoration-none">
                                    <a href="#" class="nav-link align-middle px-0">
                                        <i class='mx-2 bx bxs-dashboard bx-rotate-180 fs-5' style='color:white'></i>
                                        <span class="ms-1 d-none d-sm-inline text-white fs-5">Course</span>
                                    </a>
                                </router-link>
                            </li>

                            <li class="nav-item mx-4">
                                <router-link :to="{ name: 'studentMyCourse', params: { userId: user.student_id } }"
                                    class="text-decoration-none">
                                    <a href="#" class="nav-link align-middle px-0">
                                        <i class='mx-2 bx bx-book-open fs-4' style='color:white'></i>
                                        <span class="ms-1 d-none d-sm-inline text-white fs-5">My
                                            Course</span>
                                    </a>
                                </router-link>
                            </li>


                            <li class="nav-item mx-4">
                                <router-link :to="{ name: 'studentDocument', params: { userId: user.student_id } }"
                                    class="text-decoration-none">
                                    <a href="#" class="nav-link px-0 align-middle">
                                        <i class='mx-2 bx bxs-file-doc fs-5' style='color:white'></i>
                                        <span class="ms-1 d-none d-sm-inline text-white fs-5">Document</span></a>
                                </router-link>
                            </li>

                            <li class="nav-item mx-4 mt-56">
                                <div class="dropdown mt-0  ">
                                    <a href="#" class="d-flex align-items-center text-white text-decoration-none "
                                        id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img :src="getUserImageURL(user)" ui:alt="user.name"
                                            class="rounded-circle img-fluid mx-5" style="width: 50px; height: 50px;">

                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-light text-small shadow"
                                        aria-labelledby="dropdownUser1">
                                        <router-link :to="{ name: 'studentProfile', params: { userId: user.student_id } }"
                                            class="text-decoration-none">
                                            <li><a class="dropdown-item" href="#">Profile</a></li>
                                            <li class="mt-1">
                                                <a href="#" class="dropdown-item " @click="logout">
                                                    <span class="ms-1 d-none d-sm-inline">Logout</span>
                                                </a>
                                            </li>
                                        </router-link>

                                    </ul>
                                </div>
                            </li>

                        </ul>
                        <hr>
                    </div>
                </div>

                <div class="col custom-scrollbar justify-content-center overflow-scroll flex-nowrap">

                    <div class="position-fixed w-100 h-16 bg-white">

                        <i class='bx bx-bell fs-1 mt-3' style=" margin-left: 75%;"></i>

                    </div>

                    <p class="lead mt-5 text-muted mx-4 fs-1 py-2 text ">Course Enrollment </p>
                    <hr>

                    <!-- <p>Courses For {{ selectedProgram.name }}</p> -->

                    <div class="w-75 m-auto mt-5">
                        <form @submit.prevent="enroll">

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Credit</th>
                                        <th scope="col">Selected</th>
                                    </tr>
                                </thead>
                                <tbody v-for="course in courses" :key="course.id">

                                    <tr>
                                        <th scope="row">{{ course.id }}</th>
                                        <td>{{ course.name }}</td>
                                        <td>{{ course.credit }}</td>
                                        <td>
                                            <input type="checkbox" v-model="selectedCourses" :value="course.id">

                                        </td>
                                    </tr>

                                </tbody>
                                <button type="submit">Submit Request</button>

                            </table>


                        </form>

                        <div v-if="enrollmentMessage" class="mt-3">
                            {{ enrollmentMessage }}
                        </div>
                    </div>






                    <!-- <div class="bg-slate-100 mt-5 " style="height: 35px;">
                        <p class="text-center">2022 Graduate school-ITC, All Right Reserved </p>
                    </div> -->

                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" >
// width:1236
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

p {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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



@media screen and (max-width: 1236px) {

    .left,
    .right {
        width: 100%;
        /* The width is 100%, when the viewport is 800px or smaller */
    }
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

/* width */
::-webkit-scrollbar {
    width: 10px;
}



/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
}
</style>
