import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ActionCreators } from "../AppState";
import { treeOfLife } from "../model/genomes/allGenomes";
// import CurvedMenu from "curved-menu";

import "./GenomePicker.css";

const callbacks = { onGenomeSelected: ActionCreators.setGenome };

class GenomePicker extends React.PureComponent {
    static propTypes = {
        onGenomeSelected: PropTypes.func, // Called on genome selection.  Sigature: (genomeName: string): void
    };

    constructor() {
        super();
        this.state = {
            species: "",
            assembly: "",
        };
        this.renderGenomeOption = this.renderGenomeOption.bind(this);
        this.chooseSpecies = this.chooseSpecies.bind(this);
        this.chooseAssembly = this.chooseAssembly.bind(this);
        // this.menuRef = React.createRef();
    }

    renderGenomeOption(config, index) {
        const genomeName = config.genome.getName();
        return (
            <button key={index} onClick={() => this.props.onGenomeSelected(genomeName)}>
                {genomeName}
            </button>
        );
    }

    chooseSpecies(event) {
        this.setState({ species: event.currentTarget.value, assembly: "" });
    }

    chooseAssembly(event) {
        this.setState({ assembly: event.currentTarget.value });
    }

    renderTree() {
        let divList = [];
        for (const [species, details] of Object.entries(treeOfLife)) {
            divList.push(
                <div className="GenomePicker-one-species" key={species}>
                    <label htmlFor={species}>
                        <input
                            type="radio"
                            id={species}
                            value={species}
                            checked={this.state.species === species}
                            onChange={this.chooseSpecies}
                        />
                        <div className="capitalize">{species}</div>
                        <div>
                            <img className="GenomePicker-img" src={details.logoUrl} alt={species} />
                        </div>
                    </label>
                </div>
            );
        }
        return divList;
    }

    renderAssembly() {
        let divList = [];
        const assemblies = treeOfLife[this.state.species].assemblies;
        for (const assembly of assemblies) {
            divList.push(
                <label htmlFor={assembly} key={assembly}>
                    <input
                        type="radio"
                        id={assembly}
                        value={assembly}
                        checked={this.state.assembly === assembly}
                        onChange={this.chooseAssembly}
                    />
                    {assembly}
                </label>
            );
        }
        return divList;
    }

    render() {
        return (
            <div className="GenomePicker-outer">
                <div className="GenomePicker-nav">
                    <img
                        src="https://epigenomegateway.wustl.edu/browser/favicon-144.png"
                        style={{ width: "auto", height: "40px" }}
                        alt="browser logo"
                    />
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="https://epigenomegateway.readthedocs.io/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Documentation
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="http://epigenomegateway.wustl.edu/legacy/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                The 'old' browser
                            </a>
                        </li>
                    </ul>
                </div>
                <hr style={{ marginTop: 0 }} />
                <div className="GenomePicker-main">
                    {/* <div ref={this.menuRef}></div> */}
                    <div className="GenomePicker-species">{this.renderTree()}</div>
                    <div className="GenomePicker-select">
                        <div className="GenomePicker-assembly">{this.state.species && this.renderAssembly()}</div>
                        <div className="GenomePicker-go">
                            {this.state.assembly && (
                                <button
                                    className="btn btn-primary btn-lg btn-block"
                                    onClick={() => this.props.onGenomeSelected(this.state.assembly)}
                                >
                                    Go ⇒
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, callbacks)(GenomePicker);
