import { DatabaseExt } from "../../../src/utils";

describe("DatabaseExt", () => {
    describe("#exec", () => {
        it("should resolve with data", (done) => {
            const sandbox = sinon.createSandbox();

            const userId = "001";
            const todos = [
                {
                    id: "001",
                    user_id: userId,
                    title: "some-title-1",
                    content: "some-content-1"
                },
                {
                    id: "002",
                    user_id: userId,
                    title: "some-title-2",
                    content: "some-content-2"
                }
            ];

            const clientStub = {
                query: sandbox.stub().returns(Promise.all(todos)),
                release: sandbox.stub().returns()
            };
            const dbStub = { connect: sandbox.stub().returns(Promise.resolve(clientStub)) };

            const sut = new DatabaseExt(dbStub);
            const param = {
                query: "SELECT * FROM todo WHERE USER_ID = $1",
                values: [userId]
            };
            sut.exec(param)
                .then(results => {
                    expect(results).to.deep.equal(todos);
                    expect(dbStub.connect.withArgs().calledOnce).to.be.true;
                    expect(clientStub.query.withArgs(param.query, param.values).calledOnce).to.be.true;
                    expect(clientStub.release.withArgs(true).calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    });
});