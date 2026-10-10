const tickets = [
    { id: 1, name: "Example Ticket One", description: "First test ticket", status: "Open" },
    { id: 2, name: "Example Ticket Two", description: "Second test ticket", status: "Closed" },
    { id: 3, name: "Example Ticket Three", description: "Third test ticket", status: "In Progress" },
    { id: 4, name: "Example Ticket Four", description: "Fourth test ticket", status: "Resolved" },
    { id: 5, name: "Example Ticket Five", description: "Fifth test ticket", status: "Rejected" },
    { id: 6, name: "Example Ticket Six", description: "Sixth test ticket", status: "Open" },
    { id: 7, name: "Example Ticket Seven", description: "Seventh test ticket", status: "Closed" },
    { id: 8, name: "Example Ticket Eight", description: "Eighth test ticket", status: "Closed" },
    { id: 9, name: "Example Ticket One", description: "First test ticket", status: "Open" },
    { id: 10, name: "Example Ticket Two", description: "Second test ticket", status: "Closed" },
    { id: 11, name: "Example Ticket Three", description: "Third test ticket", status: "In Progress" },
    { id: 12, name: "Example Ticket Four", description: "Fourth test ticket", status: "Resolved" },
    { id: 13, name: "Example Ticket Five", description: "Fifth test ticket", status: "Rejected" },
    { id: 14, name: "Example Ticket Six", description: "Sixth test ticket", status: "Open" },
    { id: 15, name: "Example Ticket Seven", description: "Seventh test ticket", status: "Closed" },
    { id: 16, name: "Example Ticket Eight", description: "Eighth test ticket", status: "Closed" },
    { id: 17, name: "Example Ticket Two", description: "Second test ticket", status: "Closed" },
    { id: 18, name: "Example Ticket Three", description: "Third test ticket", status: "In Progress" },
    { id: 19, name: "Example Ticket Four", description: "Fourth test ticket", status: "Resolved" },
    { id: 20, name: "Example Ticket Five", description: "Fifth test ticket", status: "Rejected" },
];

const inputFieldLabels = [
    { label: "Title", fieldId: "ticket-title" },
    { label: "Project", fieldId: "ticket-project" },
    { label: "Description", fieldId: "ticket-description" },
    { label: "Ticket Type", fieldId: "ticket-type" },
    { label: "Ticket Priority", fieldId: "ticket-priority" },
    { label: "Ticket Status", fieldId: "ticket-status" },
    { label: "Owner", fieldId: "ticket-owner" },
    { label: "Developer", fieldId: "ticket-developer" },
    { label: "Comments", fieldId: "ticket-comments" },
    { label: "Attachments", fieldId: "ticket-upload" },
];

const dropdownResponses = {
    "https://localhost:7110/Projects": {
        $values: [
            { id: 1, name: "Website Redesign" },
            { id: 2, name: "Mobile App" },
            { id: 3, name: "Desktop App" },
            { id: 4, name: "API Development" },
            { id: 5, name: "Documentation" },
        ],
    },
    "https://localhost:7110/TicketTypes/Options": [
        { Value: "New Development" },
        { Value: "Work Task" },
        { Value: "Defect" },
        { Value: "Change Request" },
        { Value: "Enhancement" },
        { Value: "General Task" },
    ],
    "https://localhost:7110/TicketPriorities/Options": [
        { Value: "Low" },
        { Value: "Medium" },
        { Value: "High" },
        { Value: "Urgent" },
    ],
    "https://localhost:7110/TicketStatus/Options": [
        { Value: "New" },
        { Value: "Development" },
        { Value: "Testing" },
        { Value: "Resolved" },
    ],
    "https://localhost:7110/UserRoles/GetAllUsersInCompany": [
        { id: 1, FullName: "Alex Appuser" },
        { id: 1, FullName: "Elon Appuser" },
        { id: 1, FullName: "John Appuser" },
        { id: 1, FullName: "Natasha Appuser" },
        { id: 1, FullName: "Henry Appuser" },
        { id: 1, FullName: "Nickson Appuser" },
        { id: 1, FullName: "Princeton Appuser" },
        { id: 1, FullName: "Michael Appuser" },
    ],
};

const ticketCreateFieldRoles = {
    Project: "combobox",
    "Ticket Type": "combobox",
    "Ticket Priority": "combobox",
    "Ticket Status": "combobox",
    Owner: "combobox",
    Developer: "combobox",
    Title: "textbox",
    Description: "textbox",
    Comments: "textbox",
    Attachments: "button",
};

async function expectActionButtonOnTablePage(page, { tableName, actionName, expectedRowCount }) {
    const table = page.getByRole("table", { name: tableName, exact: true });
    await table.waitFor({ state: "visible" });

    const pagination = page.getByRole("navigation", { name: "Table pagination" });
    const hasPagination = (await pagination.count()) > 0;
    let pageCount = 1;

    if (hasPagination) {
        const pageLinks = pagination.locator("button.page-link");
        pageCount = await pageLinks.evaluateAll((buttons) =>
            buttons.filter((button) =>
                !["previous", "next"].includes(button.textContent.trim().toLowerCase())
            ).length
        );
    }

    const rows = table.locator("tbody tr");
    const rowsMissingAction = [];
    let checkedRowCount = 0;
    const actionNamePattern = new RegExp(
        `^${actionName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`
    );

    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
        if (hasPagination) {
            await pagination.getByRole("button", { name: String(pageNumber), exact: true }).click();
        }

        const rowCount = await rows.count();
        checkedRowCount += rowCount;

        for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
            const actionButton = rows
                .nth(rowIndex)
                .getByRole("button", { name: actionNamePattern });

            if ((await actionButton.count()) === 0 || !(await actionButton.isVisible())) {
                rowsMissingAction.push({ pageNumber, rowIndex });
            }
        }
    }

    return {
        pageCount,
        checkedRowCount,
        expectedRowCount,
        rowsMissingAction,
    };
}

module.exports = { 
    expectActionButtonOnTablePage,
    ticketCreateFieldRoles,
    tickets,
    inputFieldLabels,
    dropdownResponses,
};
