import React, { Component } from "react";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from "../components/Button/Button";

configure({adapter: new Adapter()});

type IProps = { onClick: () => void, text: string };

const onClick = jest.fn();
jest.mock("../components/Button/Button.module.css", () => ({}));

describe("Button component", () => {
    let sut: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
    let props: IProps;

    beforeEach(() => {
        props = {
                onClick,
                text: "Load more"
        };
        sut = shallow(<Button {...props} />);
    })

    test('should be defined', () => {
        expect(Button).toBeDefined();
    });
    test("renders and matches the snapshot", () => {
        expect(toJson(sut)).toMatchSnapshot();
    });
    test("should call onClick when button is clicked", () => {
        sut.find("button").simulate("click");
        expect(onClick).toHaveBeenCalled();
    });
    test('should render text', () => {
        expect(sut.find("button").text()).toEqual(props.text);
    });

    afterEach(() => {
        jest.clearAllMocks();
      });
});