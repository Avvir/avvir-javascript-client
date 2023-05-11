import AuthApi from "../../source/api/auth_api";
import ProjectApi from "../../source/api/project_api";
import {User} from "../../source/utilities/get_authorization_headers";
import {sandbox} from "../../tests/test_utils/setup_tests";
import Config from "../../source/config";
import {expect} from "chai";

describe('getFiltered5dTsv', () => {
    let projectId: string, user: User, email: string, password: string, filter;
    beforeEach(() => {
        email = process.env.AVVIR_SANDBOX_EMAIL
        password = process.env.AVVIR_SANDBOX_PASSWORD
        projectId = '-Mk8kNkZoSOVlAewkBqc';
        sandbox.stub(Config, "sharedErrorHandler");
        filter = {
            level1: {},
            level2: {},
            level3: {},
            level4: {},
            level5: {},
        }
    })
    describe('when a WBS exists for a project', () => {
        let login;
        beforeEach(() => {
            login = AuthApi.login(email, password);
        });
        it('returns a 5d TSV reflecting the passed through filter', () => {
            return AuthApi.login(email, password).then((user) => {
                let filename = "abc"
                return ProjectApi.getFiltered5dTsv({projectId}, "some-project", filter, user)
                    .then((tsv) => {
                        let rows = tsv.split("\n");
                        expect(rows[1]).to.contain("Wbs Code");
                        expect(rows[1]).to.contain("Component Description");
                        expect(rows[1]).to.contain("Planned Unit Cost");
                        expect(rows[1]).to.contain("Planned Qty");
                        expect(rows[1]).to.contain("Captured Installed Project");
                        expect(rows[1]).to.contain("Vendor");
                    })
            });
        });
    });
});