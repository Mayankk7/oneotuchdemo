import React from "react";
import {
  AiFillDelete,
  AiFillDislike,
  AiFillFilter,
  AiFillLike,
} from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaUserAltSlash, FaUserPlus } from "react-icons/fa";
import { allUser } from "../../data/alluserdata";
import MemberPanelCard from "../../subcomponents/Card/MemberPanelCard";
import MemberSortingCard from "../../subcomponents/Card/MemberSortingCard";
import UserProfileCard from "../../subcomponents/Card/UserProfileCard";
import MemberActionCard from "../../subcomponents/MemberAction/MemberActionCard";
import Title from "../../subcomponents/title/Title";
import AdminMenu from "../navbar/AdminMenu";

function MembersPage() {
  return (
    <div>
      <div>
        <AdminMenu />
      </div>
      <div className="mx-10">
        {/* All Members Section */}
        <div>
          <Title text="All Users" />
          <div className="flex justify-center ">
            <div className="bg-main-red shadow-delivery-shadow p-8  md:flex items-center space-y-4 md:space-y-0 md:space-x-2 justify-center">
              <MemberPanelCard text="All Users" icon={<BsFillPeopleFill />} />
              <MemberPanelCard text="Add User" icon={<FaUserPlus />} />
              <MemberPanelCard text="Filter Profile" icon={<AiFillFilter />} />
            </div>
          </div>
        </div>
        {/* Sort Members Section */}
        <div>
          <Title text="Sort Users" />
          <div className="flex justify-center">
            <div className="bg-main-red shadow-delivery-shadow p-8   items-center space-y-4 md:space-y-0  justify-center md:grid grid-cols-2 gap-6 lg:grid-cols-3 xl:flex">
              <MemberSortingCard text="Active" notification="6" />
              <MemberSortingCard text="Paid" notification="48" />
              <MemberSortingCard text="Featured" notification="15" />
              <MemberSortingCard text="Inactive" notification="10" />
              <MemberSortingCard text="Suspend" notification="7" />
              <MemberSortingCard text="All" notification="98" />
            </div>
          </div>
        </div>
        {/* Members Action Section */}
        <div className=" flex justify-center  mt-8">
          <div className="bg-blue-300 p-8 w-full  items-center space-y-4 md:space-y-0  justify-center md:grid grid-cols-2 gap-6 lg:flex">
            <MemberActionCard
              icon={
                <input
                  type="checkbox"
                  id="select"
                  name="selectall"
                  value="selectall"
                />
              }
              text="Select All"
            />
            <MemberActionCard icon={<AiFillDelete />} text="Delete" />
            <MemberActionCard icon={<AiFillLike />} text="Active" />
            <MemberActionCard icon={<AiFillDislike />} text="In Active" />
            <MemberActionCard icon={<FaUserAltSlash />} text="Suspended" />
          </div>
        </div>

        {/* User List */}
        <div className="mt-4">
          {allUser?.map((user, index) => {
            return (
              <div className="my-4 bg-main-red text-white">
                <UserProfileCard
                  name={user.name}
                  membership={user.membership}
                  id={user.id}
                  image={user.image}
                  data={user.data}
                  key={user.name + index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MembersPage;
