const ajaxWrapper = new AjaxWrapper();
const adminService = new AdminService();

async function renderOrdersGraphs() {
    try {
        const orders = await ajaxWrapper.getAllOrders();

        // Convert order dates to Date objects and extract necessary information
        const orderData = orders.allOrders.map(order => {
            const orderDate = new Date(order.orderDate);
            return {
                month: orderDate.getMonth(), // Month index (0-11)
                totalPrice: order.totalPrice
            };
        });

        // Calculate average cumulative amount of purchases for every month
        const monthlyTotals = Array.from({length: 12}, () => 0); // Initialize an array for each month
        orderData.forEach(order => {
            monthlyTotals[order.month] += order.totalPrice;
        });

        for (let i = 1; i < 12; i++) {
            monthlyTotals[i] += monthlyTotals[i - 1];
        }

        // Calculate the average for each month
        const averageMonthlyTotals = monthlyTotals.map(total => total / orders.allOrders.length);

        // Render the first graph (average cumulative amount of purchases)
        const averageMonthlyTotalsObject = averageMonthlyTotals.map((totalPrice, month) => ({
            month,
            totalPrice
        }));

        console.log('avgM', averageMonthlyTotalsObject);

        renderFirstGraph(averageMonthlyTotalsObject);

        // Aggregate the data for the second graph by summing up total prices for each month
        const aggregatedData = Array.from({length: 12}, () => ({month: 0, totalPrice: 0}));
        orderData.forEach(order => {
            aggregatedData[order.month].month = order.month;
            aggregatedData[order.month].totalPrice += order.totalPrice;
        });

        // Filter out months with zero total price
        const filteredAggregatedData = aggregatedData.filter(data => data.totalPrice > 0);

        console.log(filteredAggregatedData)
        // Render the second graph (total price distribution)
        renderSecondGraph(filteredAggregatedData);
    } catch (error) {
        console.error('Error:', error);
    }
}


const svg1 = d3.select('#graph1');
const svg2 = d3.select('#graph2');

function renderFirstGraph(data) {
    const margin = {top: 20, right: 30, bottom: 30, left: 40};
    const width = +svg1.attr('width') - margin.left - margin.right;
    const height = +svg1.attr('height') - margin.top - margin.bottom;

    const g = svg1.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define the x and y scales
    const x = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.totalPrice)])
        .nice()
        .range([height, 0]);

    const line = d3.line()
        .x((d, i) => x(i))
        .y(d => y(d.totalPrice))
        .curve(d3.curveMonotoneX);

    // Append the line chart
    g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line);

    // Add circles as data points
    g.selectAll('.dot')
        .data(data)
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('cx', (d, i) => x(i))
        .attr('cy', d => y(d.totalPrice))
        .attr('r', 5)
        .on('mouseover', (event, d) => {
            // Show the tooltip
            const tooltip = d3.select('body')
                .append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0.9);

            tooltip.html(`Month: ${d.month}<br>Total Price: ${d.totalPrice.toFixed(2)}`)
                .style('left', (event.pageX) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', () => {
            // Hide and remove the tooltip
            d3.selectAll('.tooltip').remove();
        });
}

function renderSecondGraph(data) {
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = +svg2.attr('width') - margin.left - margin.right;
    const height = +svg2.attr('height') - margin.top - margin.bottom;

    const g = svg2.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(data.map(d => d.month))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.totalPrice)])
        .nice()
        .range([height, 0]);

    // Define the X and Y axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    // Append X and Y axes to the graph
    g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)
        .append('text')
        .attr('class', 'axis-label')
        .attr('x', width / 2)
        .attr('y', 40) // Adjust the y position for the label
        .text('Month');

    g.append('g')
        .attr('class', 'y-axis')
        .call(yAxis)
        .append('text')
        .attr('class', 'axis-label')
        .attr('x', -height / 2)
        .attr('y', -40) // Adjust the y position for the label
        .attr('transform', 'rotate(-90)')
        .text('Total Price');

    const line = d3.line()
        .x(d => x(d.month) + x.bandwidth() / 2)
        .y(d => y(d.totalPrice))
        .curve(d3.curveMonotoneX);

    // Append the line chart path
    g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line);

    // Use circles as data points on the line chart
    g.selectAll('.circle')
        .data(data)
        .enter().append('circle')
        .attr('class', 'circle')
        .attr('cx', d => x(d.month) + x.bandwidth() / 2)
        .attr('cy', d => y(d.totalPrice))
        .attr('r', 5)
        .attr('fill', 'steelblue')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .on('mouseover', (event, d) => {
            // Show the tooltip
            const tooltip = d3.select('body')
                .append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0.9);

            tooltip.html(`Month: ${d.month}<br>Total Price: ${d.totalPrice.toFixed(2)}`)
                .style('left', (event.pageX) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', () => {
            d3.selectAll('.tooltip').remove();
        });
}




document.addEventListener('DOMContentLoaded', async () => {
    await adminService.authAdmin();
})
$(document).ready(function () {
    renderOrdersGraphs();
});
