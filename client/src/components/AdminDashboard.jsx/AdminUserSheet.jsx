/* This example requires Tailwind CSS v2.0+ */
import axios from "axios";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";
import Title from "../../subcomponents/title/Title";
import AdminMenu from "../navbar/AdminMenu";
import LoveLoader from "../PopUpComponent/LoveLoader";


export default function AdminUserSheet() {
    const [id, setId] = useState("");
    const [isOpen, setisOpen] = useState(false);
    const [totalclicks, setTotalclicks] = useState(0);
    const [profile, setProfile] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [recentSignup, setRecentSignup] = useState([]);
    console.log(allUsers)
    const navigate = useNavigate();

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    const token = localStorage.getItem("token");

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .post(
                "/api/auth/checkAdmin",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                setTotalclicks((prevstate) => res.data.totalclicks);
                //console.log(res.data.totalclicks);
            })
            .catch((err) => {
                //console.log(err.response);
                navigate("/onetouchmatrimony/alogin");
            });

        axios
            .get("/api/auth/admin/getAllUsers", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setAllUsers(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });

        axios
            .post(
                "/api/auth/recentSignup",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                setRecentSignup(res.data.users);
                axios
                    .post(
                        "/api/auth/updateLastView",
                        {
                            lastViewed: Date.now(),
                        },
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    )
                    .then((res) => {
                       // console.log(res.data);
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const searchHandler = (e) => {
        e.preventDefault();
        setisOpen((prevstate) => !prevstate);
        axios
            .post(`/api/auth/admin/usersheet/${id}`)
            .then((res) => {
                setProfile(res.data)
                //console.log(res.data)
            })
            .catch((err) => console.log(err));
    };

    const showProfileHandler = (profile) => {
        navigate(`/onetouchmatrimony/${profile._id}`);
    };
    const showSavedProfileHandler = (userName) => {
        axios.get(`/api/auth/admin/userIdsearch/${userName}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                //setAllUsers(res.data[0]._id);
                navigate(`/onetouchmatrimony/${res.data[0]._id}`);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    const deleteProfileHandler = (profile) => {
        const token = localStorage.getItem("token");
        axios
            .delete(`/api/auth/deleteUser/${profile._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setAllUsers((prevstate) => {
                    return prevstate.filter((item) => item._id !== profile._id);
                });
                //console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    let serialNO = 0
    return (
        <div style={{ backgroundColor: "yellow" }}>
            {/* Admin Navbar */}
            <div>
                <AdminMenu />
            </div>{" "}
            <div className="mx-10 ">
                <div>
                    <Title text="Search Users" />
                    <div>
                        <div className=" items-center justify-center flex my-8">
                            <Input
                                label="Search By Id"
                                name="idsearch"
                                type="text"
                                onChange={(e) => setId(e.target.value)}
                                value={id}
                                placeholder="ID"
                                className="w-80 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 bg-gray-100 border rounded border-gray-200"
                            />
                        </div>
                        <div className=" flex justify-center items-center flex-col my-12  mt-8">
                            <Btn onClick={searchHandler} text="Search Now" className=" " />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        {isOpen && profile && (
                            <table class="responsive-table">
                                <thead className='table-header-row'>

                                    <tr>
                                        <th scope="col" style={{ "width": "70px" }} rowspan="2">Sr. No.</th>
                                        <th scope="col" rowspan="2">User ID</th>
                                        <th scope="col" rowspan="2">Phone No.</th>
                                        <th scope="col" rowspan="2">Email</th>
                                        <th style={{ "borderBottom": "1px solid black" }} scope="col" colspan="2">Saved</th>
                                    </tr>

                                    <tr>
                                        <th>Username</th>

                                    </tr>

                                </thead>
                                <tbody>

                                    {profile.map((user) => {
                                        const userName = user.userid ? user.userid : null
                                        const mobile = user.phone ? user.phone : null
                                        const email = user.email ? user.email : null
                                        let rowspan = user.savedProfiles.length
                                        rowspan == 0 ? (rowspan = 1) : rowspan

                                        serialNO = serialNO + 1
                                        return (
                                            <>
                                                <tr className='user-table-row'>
                                                    <td rowspan={rowspan} >{serialNO}</td>
                                                    <th scope="row" rowspan={rowspan}>
                                                        <Btn
                                                            text={userName}
                                                            onClick={() => {
                                                                showProfileHandler(user);
                                                            }}
                                                        /> </th>
                                                    <td rowspan={rowspan}>
                                                        <a href={`tel:${mobile}`}>{mobile}</a>
                                                    </td>
                                                    <td rowspan={rowspan}>{email}</td>
                                                    {/* These below two are of 'Saved' -Username --Number */}
                                                    <th data-title="Domestic Gross" data-type="currency">{user.savedProfiles[0] ?
                                                        (<Btn
                                                            text={user.savedProfiles[0]}
                                                            onClick={() => {
                                                                showSavedProfileHandler(user.savedProfiles[0]);
                                                            }}
                                                        />) : (<p>---</p>)}</th>

                                                </tr>

                                                {
                                                    user.savedProfiles.map((savedUser, index) => {
                                                        const SUindex = index      //SavedUser Index to skip 0th index as already showin
                                                        return (
                                                            <>
                                                                {
                                                                    SUindex == 0 ? (<></>) : (
                                                                        <tr>
                                                                            <th>
                                                                                <Btn
                                                                                    text={savedUser}
                                                                                    onClick={() => {
                                                                                        showSavedProfileHandler(savedUser);
                                                                                    }}
                                                                                /></th>

                                                                        </tr>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                        )
                                    })}



                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <div>
                    <table class="responsive-table">
                        <thead className='table-header-row'>

                            <tr>
                                <th scope="col" style={{ "width": "70px" }} rowspan="2">Sr. No.</th>
                                <th scope="col" rowspan="2">User ID</th>
                                <th scope="col" rowspan="2">Phone No.</th>
                                <th scope="col" rowspan="2">Email</th>
                                <th style={{ "borderBottom": "1px solid black" }} scope="col" colspan="2">Saved</th>
                            </tr>

                            <tr>
                                <th>Username</th>

                            </tr>

                        </thead>
                        <tbody>

                            {allUsers.map((user) => {
                                const userName = user.userid ? user.userid : null
                                const mobile = user.phone ? user.phone : null
                                const email = user.email ? user.email : null
                                let rowspan = user.savedProfiles.length
                                rowspan == 0 ? (rowspan = 1) : rowspan

                                serialNO = serialNO + 1
                                return (
                                    <>
                                        <tr className='user-table-row'>
                                            <td rowspan={rowspan} >{serialNO}</td>
                                            <th scope="row" rowspan={rowspan}>
                                                <Btn
                                                    text={userName}
                                                    onClick={() => {
                                                        showProfileHandler(user);
                                                    }}
                                                /> </th>
                                            <td rowspan={rowspan}>
                                                <a href={`tel:${mobile}`}>{mobile}</a>
                                            </td>
                                            <td rowspan={rowspan}>{email}</td>
                                            {/* These below two are of 'Saved' -Username --Number */}
                                            <th data-title="Domestic Gross" data-type="currency">{user.savedProfiles[0] ?
                                                (<Btn
                                                    text={user.savedProfiles[0]}
                                                    onClick={() => {
                                                        showSavedProfileHandler(user.savedProfiles[0]);
                                                    }}
                                                />) : (<p>--</p>)}</th>

                                        </tr>

                                        {
                                            user.savedProfiles.map((savedUser, index) => {
                                                const SUindex = index      //SavedUser Index to skip 0th index as already showin
                                                return (
                                                    <>
                                                        {
                                                            SUindex == 0 ? (<></>) : (
                                                                <tr>
                                                                    <th>
                                                                        <Btn
                                                                            text={savedUser}
                                                                            onClick={() => {
                                                                                showSavedProfileHandler(savedUser);
                                                                            }}
                                                                        />
                                                                    </th>

                                                                </tr>
                                                            )
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })}



                        </tbody>
                    </table>

                </div>


            </div>
        </div>
    );
}
