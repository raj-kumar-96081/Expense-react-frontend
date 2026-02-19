import axios from "axios";
import { serverEndpoint } from "../config/appConfig";

// ✅ Get group details by ID (USED IN GroupExpenses.jsx)
export const getGroupById = (groupId) =>
    axios.get(`${serverEndpoint}/groups/${groupId}`, {
        withCredentials: true,
    });

// ✅ Get logged-in user's groups
export const getMyGroups = () =>
    axios.get(`${serverEndpoint}/groups/my-groups`, {
        withCredentials: true,
    });

// ✅ Create group
export const createGroup = (data) =>
    axios.post(`${serverEndpoint}/groups/create`, data, {
        withCredentials: true,
    });

// ✅ Update group
export const updateGroup = (data) =>
    axios.put(`${serverEndpoint}/groups/update`, data, {
        withCredentials: true,
    });

// ✅ Add members to group
export const addMembersToGroup = (groupId, membersEmail) =>
    axios.patch(
        `${serverEndpoint}/groups/members/add`,
        { groupId, membersEmail },
        { withCredentials: true }
    );

// ✅ Remove members
export const removeMembersFromGroup = (groupId, membersEmail) =>
    axios.patch(
        `${serverEndpoint}/groups/members/remove`,
        { groupId, membersEmail },
        { withCredentials: true }
    );

// ✅ Get groups by payment status
export const getGroupsByStatus = (status) =>
    axios.get(`${serverEndpoint}/groups/status`, {
        params: { status },
        withCredentials: true,
    });

// ✅ Get group audit log
export const getGroupAudit = (groupId) =>
    axios.get(`${serverEndpoint}/groups/${groupId}/audit`, {
        withCredentials: true,
    });