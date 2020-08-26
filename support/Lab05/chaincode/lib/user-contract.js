/*
SPDX-License-Identifier: Apache-2.0
*/
'use strict';
const { Contract, Context } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;


const Student = require('./users/student.js');
const StudentList = require('./users/student-list');

/** Class representing an auditor context. */
class UserContract extends Context {

    constructor() {
        super();
        //can give total number of auditors in the network
    }

}

/** Audit smart contract */
class StudentContract extends Contract {
    /**
     * AuditContract
     * @constructor
     * @param {string} name - the name of the smart contract
     */
    constructor() {
        super('org.b4s.user');
    }

    createContext() {
        return new AuditorContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the org.b4s.user smart contract');
    }

    async beforeTransaction(ctx) {
    }

    async unknownTransaction(ctx) {
        // This handler throws an exception
        throw new Error('Unknown transaction function');
    };

    /**
     * Returns information about the identity of the caller
     */
    async showIdentity(ctx) {
        let cid = new ClientIdentity(ctx.stub);
        console.log('Show identity called by: ', cid.getID());
        return {
            participantType: cid.getAttributeValue("participantType"),
            auditorId: cid.getAttributeValue("auditorId"),
            organizationName: cid.getAttributeValue("organizationName"),
            loggerId: cid.getAttributeValue("loggerId"),
            adminId: cid.getAttributeValue("adminId"),
            hfEnrollmentID: cid.getAttributeValue("hf.EnrollmentID"),
            getID: cid.getID(),
            getMSPID: cid.getMSPID(),
        };
    }

    async getStudent(ctx, organizationId, studentId) {
        //TODO Complete
    }

    async getAllStudents(ctx) {
        return await ctx.StudentList.getAllAuditors();
    }

    async createStudent(ctx, studentId, universityId, courses )   {
        //TODO Complete: Verification
        let student = Student.createInstance(studentId, universityId, courses);
        //TODO Complete: Check existance of courses

        await ctx.studentList.addStudent(student);
        await ctx.stub.setEvent('newStudent', Buffer.from(JSON.stringify(student)));
        return student;
    }

}

module.exports = UserContract;
