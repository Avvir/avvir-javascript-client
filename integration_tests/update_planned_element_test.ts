import AuthApi from "../source/api/auth_api";
import {describe} from "mocha";
import {expect} from "chai";
import {sandbox} from "../tests/test_utils/setup_tests";
import Config from "../source/config";
import FloorApi from "../source/api/floor_api";
import ElementApi from "../source/api/element_api";
import DetailedElement from "../source/models/domain/detailed_element";
import {NOT_BUILT} from "../source/models/enums/scan_label";
import ApiPlannedElement from "../source/models/api/api_planned_element";




describe("When a user is authenticated for a project", () => {
  let projectId: string, email: string, password: string, floorId: string, scanDatasetId: string, globalIds: string[], element: DetailedElement, elements: ApiPlannedElement[];
  beforeEach(() => {
    email = process.env.AVVIR_SANDBOX_EMAIL
    password = process.env.AVVIR_SANDBOX_PASSWORD
    projectId = '-Mn2Ivx4TnrrzFfsi3f0';
    floorId = '-Mn2J0rNwXEm3Vsj1Hjj';
    globalIds = ['Obj5', 'Obj7'];
    elements = [
        new ApiPlannedElement({
          globalId: globalIds[0],
          name: 'Wall',
          ifcType: 'some-ifc-type',
          uniformat: "A1010.10"
        }),
      new ApiPlannedElement({
        globalId: globalIds[1],
        name: 'Floor',
        ifcType: 'some-ifc-type',
        uniformat: "B1010.10"
      })
    ]
    sandbox.stub(Config, "sharedErrorHandler");
  })

    it("should update planned building element",  function (done) {
        this.timeout(0)
        console.log("starting...")
        AuthApi.login(email, password)
            .then((user) => {
                ElementApi.updatePlannedBuildingElements(
                    {projectId: projectId,floorId: floorId},
                      elements,
                      user
                    )
                    .then(() => {
                        ElementApi.getPlannedBuildingElements({projectId, floorId }, user)
                            .then(planned_building_elements =>{
                              let obj5: ApiPlannedElement, obj7: ApiPlannedElement;
                              planned_building_elements
                                  .forEach(element => {
                                    if(element.globalId == globalIds[0]) obj5 = element;
                                    if(element.globalId == globalIds[1]) obj7 = element;
                                  });

                              expect(obj5.uniformat).to.eq("A1010.10")
                              expect(obj5.name).to.eq("Wall")
                              expect(obj7.uniformat).to.eq("B1010.10")
                              expect(obj7.name).to.eq("Floor")
                              done()
                            })
                    })
            })
    })


});

describe("When a user is not authenticated for a project", () => {
    let projectId: string, email: string, password: string, floorId: string,
        scanDatasetId: string, globalIds: string[], elements: ApiPlannedElement[];
    beforeEach(() => {
        email = 'avvir_sandbox_2@email.com'
        password = 'H6BM7e*gjOsV*n5X'
        projectId = '-Mn2Ivx4TnrrzFfsi3f0';
        floorId = '-Mn2J0rNwXEm3Vsj1Hjj';
        globalIds = ['Obj5', 'Obj7'];
        elements = [
          new ApiPlannedElement({
            globalId: globalIds[0],
            name: 'Wall',
            ifcType: 'some-ifc-type',
            uniformat: "A1010.10"
          }),
          new ApiPlannedElement({
            globalId: globalIds[1],
            name: 'Floor',
            ifcType: 'some-ifc-type',
            uniformat: "B1010.10"
          })
        ]
        sandbox.stub(Config, "sharedErrorHandler");
    })

    it("should not update planned building element",  function(done) {
        this.timeout(0)
        console.log("starting...")
      AuthApi.login(email, password)
          .then((user) => {
            ElementApi.updatePlannedBuildingElements(
                {projectId: projectId,floorId: floorId},
                elements,
                user
            ).then(() => {
                  ElementApi.getPlannedBuildingElements({projectId, floorId }, user)
                      .then(planned_building_elements =>{
                        expect(planned_building_elements).to.eq(undefined)
                        done()
                      });
                })
          })
    })


});